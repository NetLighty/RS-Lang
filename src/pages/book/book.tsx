import React from 'react';
import Footer from '~/components/footer/footer';
import TextbookContent from '../../components/textbook/textbookContent';
import './book.scss';

const Book = () => (
  <>
  <div className="book">
    <TextbookContent />
  </div>
      <div className="book__footer">
      <Footer />
  </div>
  </>
);

export default Book;
