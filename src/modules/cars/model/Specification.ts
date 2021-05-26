import { v4 as uuidv4 } from 'uuid';

class Specification {
  id?: string;

  name: string;

  description: string;

  // eslint-disable-next-line camelcase
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Specification };
