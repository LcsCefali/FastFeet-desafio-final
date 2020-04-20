import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Modal from 'react-modal';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdSearch,
  MdMoreHoriz,
  MdRemoveRedEye,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { deleteRequest } from '~/store/modules/deliveries/actions';
// import ModalContent from '~/components/ModalContent';
import Pagination from '~/components/Pagination';
import {
  Container,
  Title,
  Header,
  Search,
  LiHeader,
  LiContent,
  DivAcao,
  DeliverymanAvatar,
  Status,
  AcaoList,
  Modal,
  Assinatura,
} from './styles';
import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [pages, setPage] = useState(1);

  function handleToggleVisible(delivery_id) {
    const response = deliveries.map((d) => {
      return {
        ...d,
        visible: d.id === delivery_id && !d.visible,
      };
    });
    setDeliveries(response);
  }

  function handleModalOpen(delivery_id) {
    const response = deliveries.map((d) => {
      return {
        ...d,
        modalVisible: d.id === delivery_id && !d.modalVisible,
        visible: d.id === delivery_id && !d.visible,
      };
    });
    // console.log(response);
    setDeliveries(response);
  }

  async function handleDelete(delivery_id) {
    try {
      const response = await api.delete(`/deliveries/${delivery_id}`);

      setDeliveries(
        deliveries.filter((delivery) => delivery.id !== delivery_id)
      );

      toast.success(
        `Encomenda (${response.data.product}) excluida com sucesso.`
      );
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  async function searchDeliveries(e) {
    // console.log(e.target.value);
    const response = await api.get('deliveries', {
      params: { q: e.target.value },
    });

    const resps = response.data.map((d) => {
      return {
        color: Math.floor(Math.random() * 6),
        visible: false,
        modalVisible: false,
        ...d,
      };
    });
    setDeliveries(resps);
  }

  useEffect(() => {
    async function loadDeliveries(page = 1) {
      const response = await api.get(`deliveries/?p=${pages}`);

      const resps = response.data.map((d) => {
        return {
          color: Math.floor(Math.random() * 6),
          visible: false,
          modalVisible: false,
          ...d,
        };
      });
      setDeliveries(resps);
    }

    loadDeliveries(pages);
  }, [pages]); // deliveries

  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <Header>
        <div>
          <MdSearch size={20} />
          <Search
            placeholder="Buscar por encomendas"
            onKeyUp={(e) => searchDeliveries(e)}
          />
        </div>

        <Link to="/deliveries/register">
          <MdAdd color="#FFF" size={22} />
          CADASTRAR
        </Link>
      </Header>

      <ul>
        <LiHeader>
          <div>ID</div>
          <div>Destinatário</div>
          <div>Entregador</div>
          <div>Cidade</div>
          <div>Estado</div>
          <div>Status</div>
          <DivAcao>Ações</DivAcao>
        </LiHeader>

        {deliveries.map((delivery) => (
          <LiContent key={delivery.id}>
            <div>#{delivery.id}</div>
            <div>{delivery.recipient.name_destiny}</div>
            <div>
              {delivery.deliveryman.avatar ? (
                <img
                  src={delivery.deliveryman.avatar.url}
                  alt="Avatar entregador"
                />
              ) : (
                  <DeliverymanAvatar
                    alt={delivery.deliveryman.name}
                    name={delivery.deliveryman.name.replace(' ', '+')}
                    color={delivery.color}
                  />
                )}

              {delivery.deliveryman.name}
            </div>
            <div>{delivery.recipient.city}</div>
            <div>{delivery.recipient.state}</div>
            <div>
              <Status status={delivery.status}>{delivery.status}</Status>
            </div>
            <DivAcao>
              <MdMoreHoriz
                color="#C6C6C6"
                size={24}
                onClick={() => handleToggleVisible(delivery.id)}
              />
              <AcaoList key={delivery.id} visible={delivery.visible}>
                <button
                  type="button"
                  onClick={() => handleModalOpen(delivery.id)}
                >
                  <MdRemoveRedEye color="#7D40E7" />
                  <div>Visualizar</div>
                </button>
                <Link
                  to={{
                    pathname: '/deliveries/edit',
                    state: delivery,
                  }}
                >
                  <MdEdit color="#4D85EE" />
                  <div>Editar</div>
                </Link>
                <button type="button" onClick={() => handleDelete(delivery.id)}>
                  <MdDeleteForever color="#DE3B3B" />
                  <div>Excluir</div>
                </button>
              </AcaoList>
            </DivAcao>
            <Modal
              key={delivery.id}
              visible={delivery.modalVisible}
              onClick={() => handleModalOpen(delivery.id)}
            >
              <li>
                <section>
                  <span>
                    <strong>Informações da encomenda</strong>
                    <p>
                      {delivery.recipient.name_destiny},{' '}
                      {delivery.recipient.number}
                    </p>
                    <p>
                      {delivery.recipient.city},{' - '}
                      {delivery.recipient.state}
                    </p>
                    <p>{delivery.recipient.zip_code}</p>
                  </span>
                </section>
                <section>
                  <span>
                    <strong>Datas</strong>
                    <p>
                      {delivery.start_date && delivery.end_date
                        ? ''
                        : `Pendente desde ${format(
                          parseISO(delivery.created_at),
                          'dd/MM/yyyy'
                        )}`}
                    </p>
                    <p>
                      {delivery.start_date
                        ? `Retirada ${format(
                          parseISO(delivery.start_date),
                          'dd/MM/yyyy'
                        )}`
                        : ''}
                    </p>
                    <p>
                      {delivery.end_date
                        ? `Entrega ${format(
                          parseISO(delivery.end_date),
                          'dd/MM/yyyy'
                        )}`
                        : ''}
                    </p>
                  </span>
                </section>
                <section>
                  <span>
                    <strong>Assinatura do destinatário</strong>
                  </span>
                </section>
                <Assinatura>
                  {delivery.signature ? (
                    <img src={delivery.signature.url} alt="Sem assinatura" />
                  ) : (
                      <strong>Sem Assinatura</strong>
                    )}
                </Assinatura>
              </li>
            </Modal>
          </LiContent>
        ))}
      </ul>
      <Pagination page={pages} setPage={setPage} />
    </Container>
  );
}
