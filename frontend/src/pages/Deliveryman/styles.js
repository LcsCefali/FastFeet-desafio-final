import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

const colorValues = [
  '#7159c1',
  '#CB946C',
  '#83CEC9',
  '#CC7584',
  '#A8D080',
  '#CCCC8B',
];

const statusColor = {
  Pendente: '#C1BC35',
  Retirada: '#4D85EE',
  Entregue: '#2CA42B',
  Cancelada: '#DE3B3B',
};

export const Container = styled.div`
  max-width: 90%;
  margin: 24px auto;

  li {
    display: grid;
    grid-template-columns: repeat(1, 250px 250px 250px 1fr);
    align-items: center;
    width: 100%;
  }
`;

export const Title = styled.h1`
  color: #444;
  font-size: 24px;
  padding: 30px 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 8px;
    background-color: #fff;
    border: 1px solid #dddddd;
    border-radius: 4px;
    color: #999999;
    font-size: 13px;
    transition: border 320ms;

    &:hover {
      border-color: #7d40e7;

      svg {
        color: #7d40e7;
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    background-color: #7d40e7;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 0 15px;
    transition: background 320ms;

    &:hover {
      background-color: ${darken(0.1, '#7d40e7')};
    }
  }
`;

export const Search = styled.input.attrs({
  type: 'text',
})`
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
  outline: none;
  border: 0;
  color: #999999;
  padding: 8px 12px;

  &::placeholder {
    color: #999999;
  }
`;

export const LiHeader = styled.li`
  color: #444;
  font-weight: bold;
  padding: 20px 20px 0 20px;
  margin: 0 15px;
  font-size: 16px;
`;

export const LiContent = styled.li`
  color: #666;
  font-size: 16px;
  background-color: #fff;
  padding: 10px 18px;
  margin: 20px;
  border-radius: 4px;
  transition: box-shadow 220ms ease-in-out;

  div {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &:hover {
    box-shadow: 0 6px 6px rgba(125, 64, 231, 0.19),
      0 6px 6px rgba(125, 64, 231, 0.25);
  }
`;

export const DivAcao = styled.div`
  position: absolute;
  cursor: pointer;
  /* text-align: center;
  justify-content: center; */
  left: calc(100% - 200px);

  svg {
    margin-top: 8px;
  }
`;

export const DeliverymanAvatar = styled.img.attrs((props) => ({
  src: `https://ui-avatars.com/api/?name=${
    props.name
    }&format=svg&font-weight=bold&size=40&background=${lighten(
      0.35,
      `${colorValues[props.color]}`
    ).replace('#', '')}&color=${colorValues[props.color].replace(
      '#',
      ''
    )}&rounded=true`,
}))`
  padding-right: 5px;
`;

export const Status = styled.div`
  position: relative;
  padding-left: 24px;
  padding-right: 8px;
  border-radius: 12px;
  height: 27px;

  ${(params) =>
    css`
      background-color: ${lighten(0.45, statusColor[params.status])};
      color: ${statusColor[params.status]};
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
      transition: background 220ms;

      &::after {
        position: absolute;
        left: 8px;
        width: 10px;
        height: 10px;
        background: ${statusColor[params.status]};
        content: '';
        border-radius: 50%;
      }

      &:hover {
        background-color: ${lighten(0.42, statusColor[params.status])};
        color: ${statusColor[params.status]};
      }
    `}
`;

export const AcaoList = styled.ul`
  position: absolute;
  z-index: 1;
  display: ${(params) => (params.visible ? 'block' : 'none')} !important;
  width: 130px;
  left: calc(100% - 75px);
  top: calc(100% + 10px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 15px 5px;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 12px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ccc;
  }

  div {
    padding-left: 10px;
  }

  svg {
    margin: 0;
  }

  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    color: #777;

    & + button {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    color: #777;
    border: 0;
    background: transparent;
    width: 100%;
    font-size: 16px;

    & + button {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #eee;
    }
  }
`;

export const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#7159c1',
  },
};
// export const Acao = styled.li``;
