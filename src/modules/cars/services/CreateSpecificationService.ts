import { ISpecificationRepository } from '../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }
    this.specificationRepository.create({
      name,
      description,
    });
  }
}

export default CreateSpecificationService;