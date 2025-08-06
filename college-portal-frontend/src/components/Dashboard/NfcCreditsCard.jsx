import React from 'react';
import { Wallet2 } from 'react-bootstrap-icons'; // or use another icon

const NfcCreditsCard = ({ balance = 124, lastRecharge = '₹200 on 02 Aug' }) => {
  return (
    <div className="card nfc-card text-white">
      <div className="text-center">
        <Wallet2 size={50} className="nfc-icon" />
      </div>

      <h4 className="text-light fw-bold">
        Balance : ₹{balance}
      </h4>

      <div className="fw-bold">
        Last Recharge: {lastRecharge}
      </div>
    </div>
  );
};

export default NfcCreditsCard;
