import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTransaction } from '../../../../contexts/TransactionsContext';
import { SearchFormContainer } from "./styles";

const searchFormSchema = z.object({
  query: z.string(),
});
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });
  const { fetchTransactions } = useTransaction()

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }
  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações"  {...register('query')}/>

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}