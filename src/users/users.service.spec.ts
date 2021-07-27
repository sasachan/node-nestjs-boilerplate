import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service"

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
    find: jest.fn(),
});

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: MockRepository;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: Connection, useValue: {}},
                {provide: getRepositoryToken(User), useValue: createMockRepository()},
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        usersRepository = module.get<MockRepository>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        describe('when user with ID exists', () => {
            it('should return the user object', async () => {
                const id = 1;
                const expectedUser = {};

                usersRepository.findOne.mockReturnValue(expectedUser);
                const user = await service.findOne(id);
                expect(user).toEqual(expectedUser);
            });
        });
        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                const id = 1;
                usersRepository.findOne.mockReturnValue(undefined);

                try{
                    await service.findOne(id);
                }
                catch (err){
                    expect(err).toBeInstanceOf(NotFoundException);
                    expect(err.message).toEqual('No such ID is found');
                }
            });
        });
    });

    describe('findAll', () => {
        describe('when users exists', () => {
            it('should return the user object', async () => {
                const expectedUsers = [];

                usersRepository.find.mockReturnValue(expectedUsers);
                const users = await service.findAll();
                expect(users).toEqual(expectedUsers);
            });
        });
        describe('otherwise', () => {
            it('should throw the "NotFoundException"', async () => {
                usersRepository.find.mockReturnValue(undefined);

                try{
                    await service.findAll();
                }
                catch (err){
                    expect(err).toBeInstanceOf(NotFoundException);
                    expect(err.message).toEqual('There are no users');
                }
            });
        });
    });
});

