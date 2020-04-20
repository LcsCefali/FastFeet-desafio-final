import React, { useState, useEffect } from 'react';
import { MdMoreHoriz, MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import {
  Container,
  Title,
  LiHeader,
  LiContent,
  DivAcao,
  AcaoList,
  Modal,
} from './styles';
import api from '~/services/api';

export default function Recipient() {
  const [problems, setProblems] = useState([]);
  const [pages, setPage] = useState(1);

  function handleToggleVisible(delivery_id) {
    const response = problems.map((problem) => {
      return {
        ...problem,
        visible: problem.id === delivery_id && !problem.visible,
      };
    });
    setProblems(response);
  }

  function handleModalOpen(delivery_id) {
    const response = problems.map((problem) => {
      return {
        ...problem,
        modalVisible: problem.id === delivery_id && !problem.modalVisible,
        visible: problem.id === delivery_id && !problem.visible,
      };
    });
    setProblems(response);
  }

  async function handleDelete(delivery_id) {
    try {
      await api.delete(`/problem/${delivery_id}/cancel-delivery`);

      setProblems(problems.filter((problem) => problem.id !== delivery_id));
      toast.success(`Encomenda cancelada com sucesso.`);
    } catch (err) {
      toast.error('Falha ao deletar este destinatário.');
    }
  }

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get(`delivery/problems/?p=${pages}`);

      const resps = response.data.map((problem) => {
        return {
          visible: false,
          ...problem,
        };
      });

      setProblems(resps);
    }

    loadProblems();
  }, [pages]);

  return (
    <Container>
      <Title>Problemas na entrega</Title>
      <ul>
        <LiHeader>
          <div>Encomenda</div>
          <div>Problema</div>
          <DivAcao>Ações</DivAcao>
        </LiHeader>

        {problems.map((problem) => (
          <LiContent key={problem.id}>
            <div>#{problem.delivery_id}</div>
            <div>{problem.description.substr(0, 140)}...</div>
            <DivAcao>
              <MdMoreHoriz
                color="#C6C6C6"
                size={24}
                onClick={() => handleToggleVisible(problem.id)}
              />
              <AcaoList key={problem.id} visible={problem.visible}>
                <button
                  type="button"
                  onClick={() => handleModalOpen(problem.id)}
                >
                  <MdRemoveRedEye color="#7D40E7" />
                  <div>Visualizar</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(problem.delivery_id)}
                >
                  <MdDeleteForever color="#DE3B3B" />
                  <div>Cancelar encomenda</div>
                </button>
              </AcaoList>
            </DivAcao>
            <Modal
              key={problem.id}
              visible={problem.modalVisible}
              onClick={() => handleModalOpen(problem.id)}
            >
              <li>
                <div>
                  <span>
                    <strong>Visualizar Problema</strong>
                    <p>{problem.description}</p>
                  </span>
                </div>
              </li>
            </Modal>
          </LiContent>
        ))}
      </ul>
      <Pagination page={pages} setPage={setPage} />
    </Container>
  );
}
