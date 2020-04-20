import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    width: 140px;
    height: 140px;

    strong {
      color: #ddd;
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 2px dashed rgba(125, 64, 231, 0.3);
      border-radius: 50%;
      padding: 30px 20px;
    }

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 3px solid rgba(125, 64, 231, 0.3);
      background: #7d40e7;
    }

    input {
      display: none;
    }
  }
`;
