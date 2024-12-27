import { Test, TestingModule } from '@nestjs/testing';
import { CapeController } from '../src/cape/cape.controller';
import { CapeService } from '../src/cape/cape.service';

describe('CapeController', () => {
  let capeController: CapeController;
  let capeService: CapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapeController],
      providers: [
        {
          provide: CapeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    capeController = module.get<CapeController>(CapeController);
    capeService = module.get<CapeService>(CapeService);
  });

  it('findAll should return an array of capes', async () => {
    const result = [
      {
        id: 1,
        name: 'Agent of Oblivion',
        description:
          "0.05% of profits are donated to Superstone National Park as part of the Ministry of Unity's 'Greener Galaxy' campaign.",
        type: 'Medium',
        armor_rating: 100,
        speed: 100,
        stamina_regen: 100,
        image_url: 'images/7993acf3-e6e4-455c-b91d-f65bdca3dbdf.png',
        passive: [],
        loadouts: [],
      },
    ];
    jest.spyOn(capeService, 'findAll').mockResolvedValue(result);
    expect(await capeController.findAll()).toBe(result);
  });

  it('findOne should return a single cape by id', async () => {
    const result = {
      id: 1,
      name: 'Agent of Oblivion',
      description:
        "0.05% of profits are donated to Superstone National Park as part of the Ministry of Unity's 'Greener Galaxy' campaign.",
      type: 'Medium',
      armor_rating: 100,
      speed: 100,
      stamina_regen: 100,
      image_url: 'images/7993acf3-e6e4-455c-b91d-f65bdca3dbdf.png',
      passive: [],
      loadouts: [],
    };
    jest.spyOn(capeService, 'findOne').mockResolvedValue(result);

    expect(await capeController.findOne('1')).toBe(result);
  });

  it('findOne should return null if cape not found', async () => {
    jest.spyOn(capeService, 'findOne').mockResolvedValue(null);

    expect(await capeController.findOne('999')).toBeNull();
  });
});
