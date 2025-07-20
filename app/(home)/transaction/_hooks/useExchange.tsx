import useTransactionStore from "../_store/transaction";

export default function useExchange() {
  const { isModalOpened, showModal, closeModal } = useTransactionStore();

  return { isModalOpened, showModal, closeModal };
}
