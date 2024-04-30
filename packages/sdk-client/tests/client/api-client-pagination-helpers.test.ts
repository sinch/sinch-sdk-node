import {
  calculateNextPage,
  hasMore,
  PaginationContext,
  PaginationEnum,
} from '../../src';
import { Headers } from 'node-fetch';

describe('API Client Pagination Helper', () => {

  const paginationTokenProperties = {
    apiName: '',
    operationId: '',
    dataKey: 'elements',
    requestOptions: {
      headers: new Headers(),
      hostname: 'example.com',
    },
  };
  const paginationContextToken: PaginationContext = {
    pagination: PaginationEnum.TOKEN,
    ...paginationTokenProperties,
  };
  const paginationContextPage: PaginationContext = {
    pagination: PaginationEnum.PAGE,
    ...paginationTokenProperties,
  };
  const paginationContextPage2: PaginationContext = {
    pagination: PaginationEnum.PAGE2,
    ...paginationTokenProperties,
  };
  const paginationContextPage3: PaginationContext = {
    pagination: PaginationEnum.PAGE3,
    ...paginationTokenProperties,
  };


  describe('hasMore', () => {

    it('should return "true" when the PaginationContext is "TOKEN" and there are more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        nextPageToken: 'nextPageToken',
        totalSize: 10,
      };
      const paginationContext = { ...paginationContextToken };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeTruthy();
    });

    it('should return "false" when the PaginationContext is "TOKEN" and there are no more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        nextPageToken: '',
        totalSize: 2,
      };
      const paginationContext = { ...paginationContextToken };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeFalsy();
    });

    it('should return "true" when the PaginationContext is "PAGE" and there are more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        page: 0,
        page_size: 2,
        count: 10,
      };
      const paginationContext = { ...paginationContextPage };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeTruthy();
    });

    it('should return "false" when the PaginationContext is "PAGE" and there are no more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        page: 0,
        page_size: 2,
        count: 2,
      };
      const paginationContext = { ...paginationContextPage };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeFalsy();
    });

    it('should return "true" when the PaginationContext is "PAGE2" and there are more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 10,
      };
      const paginationContext = { ...paginationContextPage2 };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeTruthy();
    });

    it('should return "false" when the PaginationContext is "PAGE2" and there are no more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 2,
      };
      const paginationContext = { ...paginationContextPage2 };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeFalsy();
    });

    it('should return "true" when the PaginationContext is "PAGE3" and there are more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 10,
        totalPages: 5,
      };
      const paginationContext = { ...paginationContextPage3 };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeTruthy();
    });

    it('should return "false" when the PaginationContext is "PAGE3" and there are no more elements', async () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 2,
        totalPages: 1,
      };
      const paginationContext = { ...paginationContextPage3 };

      // When
      const hasMoreElements = hasMore(response, paginationContext);

      // Then
      expect(hasMoreElements).toBeFalsy();
    });

  });

  describe('calculateNextPage', () => {

    it('should return the next page token when the PaginationContext is "TOKEN"', () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        nextPageToken: 'nextPageToken',
        totalSize: 10,
      };
      const paginationContext = { ...paginationContextToken };

      // When
      const nextPage = calculateNextPage(response, paginationContext);

      // Then
      expect(nextPage).toBe('nextPageToken');
    });

    it('should return the next page value when the PaginationContext is "PAGE"', () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        page: 0,
        page_size: 2,
        count: 10,
      };
      const paginationContext = { ...paginationContextPage };

      // When
      const nextPage = calculateNextPage(response, paginationContext);

      // Then
      expect(nextPage).toBe('1');
    });

    it('should return the next page value when the PaginationContext is "PAGE2"', () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 10,
      };
      const paginationContext = { ...paginationContextPage2 };

      // When
      const nextPage = calculateNextPage(response, paginationContext);

      // Then
      expect(nextPage).toBe('2');
    });

    it('should return the next page value when the PaginationContext is "PAGE3"', () => {
      // Given
      const response = {
        elements: ['H', 'He'],
        pageNumber: 1,
        pageSize: 2,
        totalItems: 2,
        totalPages: 1,
      };
      const paginationContext = { ...paginationContextPage3 };

      // When
      const nextPage = calculateNextPage(response, paginationContext);

      // Then
      expect(nextPage).toBe('2');
    });
  });

});
