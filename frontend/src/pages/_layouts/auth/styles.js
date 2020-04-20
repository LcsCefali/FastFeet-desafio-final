import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;

  form {
    background-color: #fff;
    color: #fce57e;
    display: flex;
    flex-direction: column;
    padding: 50px 30px 50px 30px;
    border-radius: 4px;

    img {
      padding: 10px 10px 20px 10px;
    }

    label {
      color: #3b3434;
      font-weight: bold;
      padding: 20px 0 5px 0;
    }

    input {
      padding: 10px;
      border: 1px solid #dadada;
      border-radius: 4px;
      color: #383838;
      transition: border 0.4s;

      &::placeholder {
        /* color: #bababa; */
        color: ${lighten(0.09, '#7d40e7')};
      }

      &:focus {
        border-color: #7d40e7;
      }

      &:hover {
        border-color: #7d40e7;
      }
    }

    span {
      color: #F64C75;
      align-self: center;
      margin: 5px 0 5px;
      font-weight: bold;
    }

    button {
      padding: 10px;
      margin: 15px 0 0 0;
      background-color: #7d40e7;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      font-size: 12px;
      color: #fff;
      transition: background 0.2s;

      &:hover {
        background-color: ${darken(0.03, '#7d40e7')};
      }
    }
  }
`;
