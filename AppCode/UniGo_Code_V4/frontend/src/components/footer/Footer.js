import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import pdf from '../../Privacy Policy.pdf'

export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted fixed-bottom'>
      <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href={pdf}>
          Privacy policy
        </a>
      </div>
    </MDBFooter>
  );
}