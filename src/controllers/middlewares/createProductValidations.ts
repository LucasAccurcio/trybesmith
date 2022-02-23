import { NextFunction, Request, Response } from 'express';
import { BaseProduct } from '../../interfaces/ProductInterface';
import StatusCode from '../../enums/StatusCode';

const properties = ['name', 'amount'];

function validateProperties(product: BaseProduct): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateName(name: string) {
  if (typeof name !== 'string') return [false, 'Name must be a string'];
  if (name.length <= 2) return [false, 'Name must be longer than 2 characters'];
  return [true, null];
}

function validateAmount(amount: string) {
  if (typeof amount !== 'string') return [false, 'Amount must be a string'];
  if (amount.length <= 2) return [false, 'Amount must be longer than 2 characters'];
  return [true, null];
}

function validateValues(product: BaseProduct) {
  let [valid, error] = validateName(product.name);
  if (!valid) return [valid, error];

  [valid, error] = validateAmount(product.amount);
  if (!valid) return [valid, error];

  return [true, null];
}

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const product: BaseProduct = req.body;

  const [valid, property] = validateProperties(product);

  let prop = property;
  if (typeof prop === 'string') {
    prop = prop.charAt(0).toLocaleUpperCase() + prop.substring(1);
  }

  if (!valid) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ error: `${prop} is required` });
  }

  const [isValid, error] = validateValues(product);

  if (!isValid) {
    return res
      .status(StatusCode.UNPROCESSABLE_ENTITY)
      .json({ error });
  }

  next();
}

export default validationProduct;