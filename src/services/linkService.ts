import Link, { ILink } from '../models/linkModel';
import { generateCode } from '../utils/codeGenerator';
import { AppError } from '../utils/customError.js';

const createShortLink = async (originalUrl: string): Promise<ILink> => {
  const maxAttempts = 5;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = generateCode(7);
    try {
      const newLink = await Link.create({
        code,
        original_url: originalUrl,
      });
      return newLink;
    } catch (error: any) {
      if (error.code === 11000) {
        continue;
      }
      throw error;
    }
  }

  throw new AppError(500, 'Unable to generate a unique short code. Please try again.');
};

const getAndIncrementLink = async (code: string): Promise<ILink> => {
  const link = await Link.findOneAndUpdate({ code }, { $inc: { clicks: 1 } });

  if (!link) {
    throw new AppError(404, 'Short link not found');
  }

  return link;
};

const getLinkStats = async (code: string): Promise<ILink> => {
  const link = await Link.findOne({ code });

  if (!link) {
    throw new AppError(404, 'Short link not found');
  }

  return link;
};

export const LinkService = {
  createShortLink,
  getAndIncrementLink,
  getLinkStats,
};
