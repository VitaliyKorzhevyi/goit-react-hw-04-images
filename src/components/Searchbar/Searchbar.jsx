import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Header, SearchForm, SearchBtn, SearchInput } from './Searchbar.styled';

let schema = yup.object().shape({
  search: yup.string().required(),
});

const initialValues = { search: '' };

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <SearchForm>
          <SearchBtn type="submit">
            <span>&#128269;</span>
          </SearchBtn>
          <SearchInput
            className="input"
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Search images and photos"
          />
          {/* <ErrorMessage name="search" render={msg => <span> {msg} </span>} /> */}
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
