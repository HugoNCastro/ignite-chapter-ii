import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists!!');
    }
    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryService;
