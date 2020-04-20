import React from 'react';

import { Container } from './styles';

export default function Pagination({ page, setPage }) {
  return (
    <Container>
      {page >= 2 && (
        <>
          <button type="button" onClick={() => setPage(page - 1)}>
            {page - 1}
          </button>
          <button type="button" onClick={() => setPage(page)}>
            {page}
          </button>
          <button type="button" onClick={() => setPage(page + 1)}>
            {page + 1}
          </button>
        </>
      )}

      {page === 1 && (
        <>
          <button type="button" onClick={() => setPage(page - 1)}>
            {page - 1}
          </button>
          <button type="button" onClick={() => setPage(page)}>
            {page}
          </button>
          <button type="button" onClick={() => setPage(page + 1)}>
            {page + 1}
          </button>
        </>
      )}
    </Container>
  );
}
