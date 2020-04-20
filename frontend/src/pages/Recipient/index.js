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

export default function Recipient() {
  const [recipients, setRecipient] = useState([]);
  const [pages, setPage] = useState(1);

  function handleToggleVisible(recipient_id) {
    const response = recipients.map((recipient) => {
      return {
        ...recipient,
        visible: recipient.id === recipient_id && !recipient.visible,
      };
    });
    setRecipient(response);
  }

  async function handleDelete(recipient_id) {
    try {
      const response = await api.delete(`/recipient/${recipient_id}`);

      setRecipient(
        recipients.filter((delivery) => delivery.id !== recipient_id)
      );

      toast.success(
        `Destinatário (${response.data.name_destiny}) excluido com sucesso.`
      );
    } catch (err) {
      toast.error('Falha ao deletar este destinatário.');
    }
  }

  async function searchRecipients(e) {
    setPage(1);
    const response = await api.get(`recipient/?p=${pages}`, {
      params: { q: e.target.value },
    });

    const resps = response.data.map((recipient) => {
      return {
        visible: false,
        ...recipient,
      };
    });

    setRecipient(resps);
  }

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get(`recipient/?p=${pages}`);

      const resps = response.data.map((recipient) => {
        return {
          visible: false,
          ...recipient,
        };
      });

      setRecipient(resps);
    }

    loadRecipients(pages);
  }, [pages]);

  return (
    <Container>
      <Title>Gerenciando destinatários</Title>
      <Header>
        <div>
          <MdSearch size={20} />
          <Search
            placeholder="Buscar por destinatários"
            onKeyUp={(e) => searchRecipients(e)}
          />
        </div>

        <Link to="/recipient/register">
          <MdAdd color="#FFF" size={22} />
          CADASTRAR
        </Link>
      </Header>

      <ul>
        <LiHeader>
          <div>ID</div>
          <div>Nome</div>
          <div>Endereço</div>
          <DivAcao>Ações</DivAcao>
        </LiHeader>

        {recipients.map((recipient) => (
          <LiContent key={recipient.id}>
            <div>#{recipient.id}</div>
            <div>{recipient.name_destiny}</div>
            <div>
              {recipient.street}, {recipient.number}, {recipient.city} -{' '}
              {recipient.state}
            </div>
            <DivAcao>
              <MdMoreHoriz
                color="#C6C6C6"
                size={24}
                onClick={() => handleToggleVisible(recipient.id)}
              />
              <AcaoList key={recipient.id} visible={recipient.visible}>
                <Link
                  to={{
                    pathname: '/recipient/edit',
                    state: recipient,
                  }}
                >
                  <MdEdit color="#4D85EE" />
                  <div>Editar</div>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(recipient.id)}
                >
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
