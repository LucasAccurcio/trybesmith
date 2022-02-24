import { Request, Response, NextFunction } from 'express';

function validateOrderProduct(req: Request, res: Response, next: NextFunction) {
  const { products } = req.body;

  if (!products) {
    return res.status(400).json({ error: 'Products is required' });
  }

  if (typeof products !== 'object') {
    return res.status(422).json({ error: 'Products must be an array of numbers' });
  }

  if (!products[0]) {
    return res.status(422).json({ error: 'Products can\'t be empty' });
  }

  next();
}

export default validateOrderProduct;