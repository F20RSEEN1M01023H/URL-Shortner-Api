import { RequestHandler } from 'express';
import { LinkService } from '../services/linkService';
import Response from '../utils/response';

interface CreateLinkBody {
  url: string;
}

interface CodeParams extends Record<string, string> {
  code: string;
}

const linkService = LinkService;

export const createLink: RequestHandler<{}, any, CreateLinkBody> = async (req, res, next) => {
  try {
    const { url } = req.body;
    const link = await linkService.createShortLink(url);
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const responseData = {
      code: link.code,
      short_url: `${baseUrl}/${link.code}`,
      original_url: link.original_url,
    };

    Response(res, 201, true, 'Short link created successfully', responseData);
  } catch (error) {
    next(error);
  }
};

export const getStats: RequestHandler<CodeParams> = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await linkService.getLinkStats(code);

    const responseData = {
      code: link.code,
      original_url: link.original_url,
      clicks: link.clicks,
      createdAt: link.createdAt,
    };

    Response(res, 200, true, 'Link stats retrieved successfully', responseData);
  } catch (error) {
    next(error);
  }
};

export const redirectToUrl: RequestHandler<CodeParams> = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await linkService.getAndIncrementLink(code);
    res.redirect(302, link.original_url);
  } catch (error) {
    next(error);
  }
};
