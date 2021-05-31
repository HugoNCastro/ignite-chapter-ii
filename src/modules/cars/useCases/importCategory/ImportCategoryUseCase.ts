import csvParse from 'csv-parse';
import fs from 'fs';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoryRepository) {}

  // eslint-disable-next-line class-methods-use-this
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async category => {
      const { name, description } = category;
      const existsCategory = this.categoriesRepository.findByName(name);
      if (!existsCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}
// eslint-disable-next-line import/prefer-default-export
export { ImportCategoryUseCase };
