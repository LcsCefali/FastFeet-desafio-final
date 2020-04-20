import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 50%;
  margin: 24px auto;

  span {
    color: #f64c75;
    align-self: center;
    margin: 5px 0 5px;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;

  input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    color: #777;

    &::placeholder {
      color: #999999;
    }
  }

  label {
    font-weight: bold;
    padding-bottom: 10px;
  }

  li {
    display: flex;
    flex-direction: column;
    padding: 5px 0;

    div {
      display: grid;
      grid-template-columns: repeat(1, 1fr 15% 15%);
      gap: 20px;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }

  li:last-child {
    display: flex;
    flex-direction: column;
    padding: 5px 0;

    div {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;

      div {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  div {
    display: flex;
    align-items: center;
    padding-left: 5px;
    cursor: pointer;
  }
`;

export const ButtonSave = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: bold;
  background-color: #7d40e7;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 5px 15px;
  transition: background 320ms;
  margin: 10px;

  &:hover {
    background-color: ${darken(0.1, '#7d40e7')};
  }
`;

export const ButtonBack = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-weight: bold;
  background-color: #ccc;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 5px 15px;
  transition: background 320ms;
  margin: 10px;

  &:hover {
    background-color: ${darken(0.1, '#ccc')};
  }
`;

export const Title = styled.h1`
  color: #444;
  font-size: 24px;
  padding: 30px 0;
`;
