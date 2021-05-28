import { Category } from '../../model/Category';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

class ListCategoriesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}
// eslint-disable-next-line import/prefer-default-export
export { ListCategoriesUseCase };
