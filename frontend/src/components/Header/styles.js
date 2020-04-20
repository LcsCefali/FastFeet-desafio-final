import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background-color: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold; /* if true */
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: #999;

      &:hover {
        color: #7159c1;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  text-align: center;

  button {
    color: #de3b3b;
    border: 0;
    background: none;
  }
`;
