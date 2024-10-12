import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import parseStorage from './parseStorage';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: parseStorage('contacts') });
    }
  }

  componentDidUpdate(rpevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      if (this.state.contacts.length === 0) {
        localStorage.removeItem('contacts');
      }
    }
  }

  checkName = name => {
    const normalizeDataName = name.toLowerCase();
    const nameIsWritten = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizeDataName
    );
    return nameIsWritten;
  };

  formSubmitHandler = data => {
    if (!this.checkName(data.name)) {
      const newContact = { id: `${nanoid()}`, ...data };
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    } else {
      alert(`${data.name} is already in contacts.`);
    }
    document.activeElement.blur();
  };

  onChangeFilter = e => {
    const filter = e.currentTarget.value.trim();
    this.setState({ filter });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <>
        <h1>Phonebook</h1>
        <div className="wrap">
          <ContactForm
            onSubmit={this.formSubmitHandler}
            onCheckName={this.checkName}
          />

          <div>
            <h2>Contacts</h2>
            <Filter value={this.state.filter} onChange={this.onChangeFilter} />
            <ContactList
              filter={this.state.filter}
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </div>
        </div>
      </>
    );
  }
}
