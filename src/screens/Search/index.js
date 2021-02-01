import React, {useState, useEffect} from 'react';

import Api from '../../Api';

import {
  Container,
  SearchArea,
  SearchInput,
  Scroller,
  LoadingIcon,
  ListArea,
  NoBarberAlert,
} from './styles';

import BarberItem from '../../components/BarberItem';

export default () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [errorText, setErrorText] = useState('');

  const searchBarbers = async () => {
    setLoading(true);
    setList([]);

    if (searchText !== '') {
      setShowList(true);

      let res = await Api.search(searchText);

      if (res.error === '') {
        setList(res.list);

        if (Object.keys(res.list).length === 0) {
          setShowList(false);
        }
      } else {
        alert(JSON.stringify(res.error));
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    setErrorText(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showList]);

  return (
    <Container>
      <SearchArea>
        <SearchInput
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          onSubmitEditing={searchBarbers}
          returnKeyType="search"
          autoFocus
          selectTextOnFocus
        />
      </SearchArea>

      <Scroller>
        {loading && <LoadingIcon size="large" color="#fff" />}
        <ListArea>
          {showList ? (
            list.map((item, k) => <BarberItem key={k} data={item} />)
          ) : (
            <NoBarberAlert>
              Nenhum barbeiro encontrado com os termos "{errorText}" :/
            </NoBarberAlert>
          )}
        </ListArea>
      </Scroller>
    </Container>
  );
};
