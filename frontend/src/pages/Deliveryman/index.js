import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdAdd,
  MdSearch,
  MdMoreHoriz,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import {
  Container,
  Title,
  Header,
  Search,
  LiHeader,
  LiContent,
  DivAcao,
  AcaoList,
} from './styles';
import api from '~/services/api';

export default function Deliveryman() {
  const [deliveryman, setDeliveryman] = useState([]);
  const [pages, setPage] = useState(1);

  function handleToggleVisible(deliveryman_id) {
    const response = deliveryman.map((d) => {
      return {
        ...d,
        visible: d.id === deliveryman_id && !d.visible,
      };
    });
    setDeliveryman(response);
  }

  async function handleDelete(deliveryman_id) {
    try {
      const response = await api.delete(`/deliveryman/${deliveryman_id}`);

      setDeliveryman(deliveryman.filter((d) => d.id !== deliveryman_id));

      toast.success(
        `Entregador(a) ${response.data.name} excluido(a) com sucesso.`
      );
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  async function searchDeliveryman(e) {
    setPage(1);
    const response = await api.get(`deliveryman/?p=${pages}`, {
      params: { q: e.target.value },
    });

    const resps = response.data.map((d) => {
      return {
        visible: false,
        ...d,
      };
    });

    setDeliveryman(resps);
  }

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get(`deliveryman/?p=${pages}`);

      const resps = response.data.map((d) => {
        return {
          visible: false,
          ...d,
        };
      });

      setDeliveryman(resps);
    }

    loadRecipients();
  }, [pages]);

  return (
    <Container>
      <Title>Gerenciando entregadores</Title>
      <Header>
        <div>
          <MdSearch size={20} />
          <Search
            placeholder="Buscar por entregadores"
            onKeyUp={(e) => searchDeliveryman(e)}
          />
        </div>

        <Link to="/deliveryman/register">
          <MdAdd color="#FFF" size={22} />
          CADASTRAR
        </Link>
      </Header>

      <ul>
        <LiHeader>
          <div>ID</div>
          <div>Foto</div>
          <div>Nome</div>
          <div>Email</div>
          <DivAcao>Ações</DivAcao>
        </LiHeader>

        {deliveryman.map((d) => (
          <LiContent key={d.id}>
            <div>#{d.id}</div>
            <div>
              {d.avatar ? (
                <img src={d.avatar.url} alt="Avatar entregador" />
              ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${d.name}&rounded=true`}
                    alt="Avatar entregador"
                  />
                )}
            </div>
            <div>{d.name}</div>
            <div>{d.email}</div>
            <DivAcao>
              <MdMoreHoriz
                color="#C6C6C6"
                size={24}
                onClick={() => handleToggleVisible(d.id)}
              />
              <AcaoList key={d.id} visible={d.visible}>
                <Link
                  to={{
                    pathname: '/deliveryman/edit',
                    state: d,
                  }}
                >
                  <MdEdit color="#4D85EE" />
                  <div>Editar</div>
                </Link>
                <button type="button" onClick={() => handleDelete(d.id)}>
                  <MdDeleteForever color="#DE3B3B" />
                  <div>Excluir</div>
                </button>
              </AcaoList>
            </DivAcao>
          </LiContent>
        ))}
      </ul>
      <Pagination page={pages} setPage={setPage} />
    </Container>
  );
}
