import { Component } from 'react';
import Proptypes from 'prop-types';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  static propTypes = {
    onCheckName: Proptypes.func.isRequired,
    onSubmit: Proptypes.func.isRequired,
  };

  handleInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    if (!this.props.onCheckName(this.state.name)) {
      this.reset();
    }
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleSubmitForm}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // pattern="^[a-zA-Zа-яА-Я]+([ '-][a-zA-Zа-яА-Я]+)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
          />{' '}
        </label>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
          />
        </label>
        <button className={css['add-btn']} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;