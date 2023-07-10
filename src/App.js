import React, { useState, useRef } from 'react';
//import { LabMate } from '@backstage/core-plugin-api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './CustomDatePicker.css';
import Logo from './logo.svg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function LabMate() {
  const [open, setOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [showMainModal, setShowMainModal] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (start && end) {
      const diffInDays = Math.round((end - start) / (24 * 60 * 60 * 1000));
      if (diffInDays > getDatesBetween(start, end)) {
        setEndDate(new Date(start.getTime() + 4 * 24 * 60 * 60 * 1000));
      } else {
        setEndDate(end);
      }
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleAddBooking = () => {
    if (startDate && endDate) {
      const newDates = getDatesBetween(startDate, endDate);
      // Esegui il codice per salvare le date prenotate nel tuo backend o in uno stato gestito
      setBookedDates([...bookedDates, ...newDates]);
      setStartDate(null);
      setEndDate(null);
    }
  };

  const getDatesBetween = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const filterWeekend = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Rimuove sabato (6) e domenica (0)
  };

   //Avere i weekend in rosso
   const redWeekend = (date) => {
    if (startDate && !endDate) {
      const diffInDays = Math.round((date - startDate) / (24 * 60 * 60 * 1000));
      if(diffInDays > 6){
        if(!filterWeekend(date)){
          return 'weekend';
        }else{
          return 'disabled';
        }
      }else{
        if(!filterWeekend(date)){
          return 'weekend';
        }else{
          return '';
        }
      }
    }else{
      return !filterWeekend(date) ? 'weekend' : '';
    }
  };

  const filterPastDates = (date) => {
    const today = new Date();
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // Verifica se è sabato (0) o domenica (6)
    return date >= today && !isWeekend;
  };

  // Array macchine disponibili
  const array = [
    {
      projectName: 'Indigo Core',
      applianceType: 'Washing Machine',
      PNC: '999007197',
      ELC: '00',
      SN: '20230303',
      MAC: '443E71A25635',
      Environment: 'UAT',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0S',
      Location: 'Porcia',
    },
    {
      projectName: 'Diamond TC2',
      applianceType: 'Tumble Dryer',
      PNC: '201735399',
      ELC: '00',
      SN: '45193475',
      MAC: '443E07657890',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'Porcia',
    },
    {
      projectName: 'P-ONE',
      applianceType: 'Washing Machine',
      PNC: '914550903',
      ELC: '01',
      SN: '45193475',
      MAC: '443E07657890',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.0',
      Location: 'Porcia',
    },
    {
      projectName: 'Emerald',
      applianceType: 'Tumble Dryer',
      PNC: '999120000',
      ELC: '00',
      SN: '98654578',
      MAC: '443E07023548',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '4.8.5-2.002',
      Location: 'Porcia',
    },
    {
      projectName: 'Autodose',
      applianceType: 'Washing Machine',
      PNC: '999000123',
      ELC: '00',
      SN: '95623467',
      MAC: '443E07657984',
      Environment: 'DEV',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'Porcia',
    },
    {
      projectName: 'PILS',
      applianceType: 'Washer Dryer',
      PNC: '999011152',
      ELC: '00',
      SN: '15482634',
      MAC: '443E07059476',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Diamond',
      applianceType: 'Tumble Dryer',
      PNC: '888735399',
      ELC: '02',
      SN: '78953345',
      MAC: '443E07896545',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Autodose',
      applianceType: 'Washing Machine',
      PNC: '914900811',
      ELC: '00',
      SN: '11326549',
      MAC: '443E07220311',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.0',
      Location: 'Porcia',
    },
    {
      projectName: 'Elux100 Apollo PS1',
      applianceType: 'Oven',
      PNC: '944184820',
      ELC: '01',
      SN: '91465312',
      MAC: '70B3D57A164',
      Environment: 'UAT',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP61',
      Location: 'Porcia',
    },
    {
      projectName: 'Cassia',
      applianceType: 'Oven',
      PNC: '926564948',
      ELC: '00',
      SN: '78956134',
      MAC: '78D35A61954',
      Environment: 'PROD',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0S',
      Location: 'Porcia',
    },
    {
      projectName: 'Ingrid',
      applianceType: 'applianceType',
      PNC: '900279376',
      ELC: '00',
      SN: '23468134',
      MAC: '443E07648513',
      Environment: 'DEV',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'Porcia',
    },
    {
      projectName: 'Genesi Titan',
      applianceType: 'Combined Refrigerator',
      PNC: '999009006',
      ELC: '00',
      SN: '24623481',
      MAC: '443E071A6584',
      Environment: 'UAT',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0S',
      Location: 'Porcia',
    },
    {
      projectName: 'CondimenTwo Level 4',
      applianceType: 'DishWasher',
      PNC: '999007010',
      ELC: '00',
      SN: '45617904',
      MAC: '443E07659143',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.2',
      Location: 'Porcia',
    },
    {
      projectName: 'Laidback',
      applianceType: 'Washing Machine',
      PNC: '914550948',
      ELC: '00',
      SN: '24613486',
      MAC: '443E07053468',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '4.8.5-2.000',
      Location: 'Porcia',
    },
    {
      projectName: 'GEM II',
      applianceType: 'Washing Machine',
      PNC: '914900938',
      ELC: '00',
      SN: '84659176',
      MAC: '443E07059761',
      Environment: 'DEV',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'Porcia',
    },
    {
      projectName: 'Diamond TC2',
      applianceType: 'Washing Machine',
      PNC: '888020001',
      ELC: '00',
      SN: '44623597',
      MAC: '443E07096485',
      Environment: 'DEV',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Autodose',
      applianceType: 'Washing Machine',
      PNC: '999040002',
      ELC: '01',
      SN: '78995631',
      MAC: '443E07046135',
      Environment: 'DEV',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.0',
      Location: 'Porcia',
    },
    {
      projectName: 'Ruby',
      applianceType: 'Washing Machine',
      PNC: '999007091',
      ELC: '00',
      SN: '64319576',
      MAC: '443E07036491',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.2',
      Location: 'Porcia',
    },
    {
      projectName: 'Laidback',
      applianceType: 'Tumble Dryer',
      PNC: '914550948',
      ELC: '02',
      SN: '15643180',
      MAC: '443E07618467',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.11.0',
      Location: 'Porcia',
    },
    {
      projectName: 'P-ONE',
      applianceType: 'Tumble Dryer',
      PNC: '944066683',
      ELC: '01',
      SN: '29761348',
      MAC: '443E07013495',
      Environment: 'PROD',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'Porcia',
    },
    {
      projectName: 'X-Five',
      applianceType: '999007018',
      PNC: '999007018',
      ELC: '00',
      SN: '78946137',
      MAC: '443E07065489',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Mamilla Autodosing',
      applianceType: 'Washing Machine',
      PNC: '914550504',
      ELC: '00',
      SN: '33164976',
      MAC: '443E07649357',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Ruby',
      applianceType: 'Tumble Dryer',
      PNC: '999007094',
      ELC: '00',
      SN: '66497831',
      MAC: '443E071A9476',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Ayran 3.0',
      applianceType: 'Combined Refrigerator',
      PNC: '999011403',
      ELC: '00',
      SN: '43169562',
      MAC: '443E07014695',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'MDR4',
      applianceType: 'Combined Refrigerator',
      PNC: '925060320',
      ELC: '00',
      SN: '78946100',
      MAC: '443E07169476',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.0',
      Location: 'Porcia',
    },
    {
      projectName: 'Genesi Next Generation',
      applianceType: 'Combined Refrigerator',
      PNC: '999011500',
      ELC: '00',
      SN: '46694760',
      MAC: '443E07984931',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Lynx',
      applianceType: 'Combined Refrigerator',
      PNC: '925060633',
      ELC: '99',
      SN: '77649134',
      MAC: '443E07446197',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'Porcia',
    },
    {
      projectName: 'Elux100 Apollo PS1',
      applianceType: 'Oven',
      PNC: '944184820',
      ELC: '01',
      SN: '20230504',
      MAC: 'MAC',
      Environment: 'DEV',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP60',
      Location: 'Porcia',
    },
    {
      projectName: 'Elux100 PS2',
      applianceType: 'applianceType',
      PNC: '944066610',
      ELC: '00',
      SN: '78043164',
      MAC: '443E07984617',
      Environment: 'DEV',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP54',
      Location: 'Porcia',
    },
    {
      projectName: 'Elux100 Combined Microwave',
      applianceType: 'Oven',
      PNC: '944066532',
      ELC: '00',
      SN: '88613497',
      MAC: '443E07487964',
      Environment: 'UAT',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP52',
      Location: 'Porcia',
    },
    {
      projectName: 'PUX Explore (Double Cavity)',
      applianceType: 'Oven',
      PNC: '00000000',
      ELC: '00',
      SN: '00000000',
      MAC: '000000000000',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Penguin 5 Zones',
      applianceType: 'Flexy Combo Hob',
      PNC: '999008029',
      ELC: '00',
      SN: '33164976',
      MAC: '443E071C97649A',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Penguin 5 Zones',
      applianceType: 'Flexy Combo Hob',
      PNC: '999008029',
      ELC: '00',
      SN: '33164976',
      MAC: '443E071C97644C',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Sumbo',
      applianceType: 'Oven',
      PNC: '944187552',
      ELC: '00',
      SN: '76493491',
      MAC: '78B3D57A6195',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.4.0',
      Location: 'Porcia',
    },
    {
      projectName: 'PUX NA Double Wall Oven',
      applianceType: 'Oven',
      PNC: '948930000',
      ELC: '00',
      SN: '20223911',
      MAC: '443E07056194',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'PUX NA Single Wall Oven',
      applianceType: 'Oven',
      PNC: '948930001',
      ELC: '00',
      SN: '20223912',
      MAC: '443E07056195',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: '443E07056194',
      applianceType: 'Combo Hob',
      PNC: '999008031',
      ELC: '00',
      SN: '20229476',
      MAC: '443E07461973',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'Porcia',
    },
    {
      projectName: 'Lux Sputnik Pyro',
      applianceType: 'Oven',
      PNC: '949499838',
      ELC: '00',
      SN: '79514867',
      MAC: '443E07197648',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'Porcia',
    },
    {
      projectName: 'Cassia High Lux',
      applianceType: 'Oven',
      PNC: '900279350',
      ELC: '00',
      SN: '34619476',
      MAC: '443E07947614',
      Environment: 'UAT',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0S',
      Location: 'Porcia',
    },
    {
      projectName: 'Laidback',
      applianceType: 'Washing Machine',
      PNC: '914550948',
      ELC: '00',
      SN: '92700010',
      MAC: '443E0701CD16',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'KL',
    },

    {
      projectName: 'Laidback',
      applianceType: 'Tumble Dryer',
      PNC: '916098758',
      ELC: '00',
      SN: '92902827',
      MAC: '443E0701CA67',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '5.3.1',
      Location: 'KL',
    },
    {
      projectName: 'Emerald',
      applianceType: 'Washing Machine',
      PNC: '914900744',
      ELC: '01',
      SN: '02012045',
      MAC: '443E070265D1',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'KL',
    },
    {
      projectName: 'Tubtim Siam',
      applianceType: 'Tumble Dryer',
      PNC: '916002188',
      ELC: '00',
      SN: '23135243',
      MAC: '443E07344817',
      Environment: 'UAT',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Ruby',
      applianceType: 'Tumble Dryer',
      PNC: '916099278',
      ELC: '02',
      SN: '30307114',
      MAC: '443E0733B2A3',
      Environment: 'PROD',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Ruby',
      applianceType: 'Washing Machine',
      PNC: '914501104',
      ELC: '00',
      SN: '24800005',
      MAC: '443E0733AC02',
      Environment: 'PROD',
      NIU_TYPE: 'NIUS',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },
    {
      projectName: 'Mitchell',
      applianceType: 'WRAC',
      PNC: '999011500',
      ELC: '00',
      SN: '90022111',
      MAC: '443E0702169F',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },

    {
      projectName: 'Whitney',
      applianceType: 'WRAC',
      PNC: '999011516',
      ELC: '00',
      SN: '94200062',
      MAC: '443E070216B1',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },

    {
      projectName: 'Cascade',
      applianceType: 'PRAC',
      PNC: '999011524',
      ELC: '00',
      SN: '04300005',
      MAC: '443E070216XX',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },

    {
      projectName: 'Spartan',
      applianceType: 'PRAC',
      PNC: '912076018',
      ELC: '00',
      SN: '11900009',
      MAC: '443E071A02F6',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },
    {
      projectName: 'Yushan',
      applianceType: 'Dehumidifier',
      PNC: '999011508',
      ELC: '00',
      SN: '90021111',
      MAC: '443E07021723',
      Environment: 'PROD',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },

    {
      projectName: 'Mitchell',
      applianceType: 'WRAC',
      PNC: '912076029',
      ELC: '99',
      SN: '14000303',
      MAC: '443E071A05AA',
      Environment: 'UAT',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Dolomite',
      applianceType: 'Dehumidifier ',
      PNC: '912076049',
      ELC: '99',
      SN: '14000217',
      MAC: '443E071A05C4',
      Environment: 'TEST',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Matterhorn',
      applianceType: 'WRAC',
      PNC: '912076009',
      ELC: '99',
      SN: '14200026',
      MAC: '443E071A0761',
      Environment: 'UAT',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Shouyang',
      applianceType: 'WRAC',
      PNC: '912076038',
      ELC: '99',
      SN: '14000399',
      MAC: '443E071A0722',
      Environment: 'TEST',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Beaver / Dolomite R32',
      applianceType: 'Dehumidifier',
      PNC: '912076057',
      ELC: '00',
      SN: '24000038',
      MAC: '443E07344EA0',
      Environment: 'PROD',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },
    {
      projectName: 'lion',
      applianceType: 'WRAC',
      PNC: '912076052',
      ELC: '00',
      SN: '24600148',
      MAC: '443E073601B0',
      Environment: 'PROD',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },
    {
      projectName: 'Air Purifier Pure A9',
      applianceType: 'Air Purifier',
      PNC: '950011384',
      ELC: '00',
      SN: '14700156',
      MAC: '4E2E1C70B761',
      Environment: 'PROD',
      NIU_TYPE: 'NIUM',
      FirmwareVersion: 'VM211_T_03.07.04',
      Location: 'KL',
    },

    {
      projectName: 'Emmanuelle',
      applianceType: 'Air Coniditoner',
      PNC: '956006502',
      ELC: '00',
      SN: '14200018',
      MAC: '443E071A0C17',
      Environment: 'UAT',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Yushan',
      applianceType: 'Dehumidifier',
      PNC: '956005993',
      ELC: '00',
      SN: '00000013',
      MAC: '443E0713EBBB',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'KL',
    },

    {
      projectName: 'Yushan',
      applianceType: 'Dehumidifier',
      PNC: '956006730',
      ELC: '00',
      SN: '21200002',
      MAC: '443E0732BDB8',
      Environment: 'PROD',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },

    {
      projectName: 'Robot Vacuum Cleaner Pure i9.2',
      applianceType: 'RVC',
      PNC: '900277470',
      ELC: '00',
      SN: '123456789',
      MAC: '4E2E1C70XXXX',
      Environment: 'PROD',
      NIU_TYPE: 'NIUM',
      FirmwareVersion: 'VM211_T_03.07.04',
      Location: 'KL',
    },
    {
      projectName: 'Yushan3',
      applianceType: 'Dehumidifier',
      PNC: '956007014',
      ELC: '00',
      SN: '24000090',
      MAC: '443E0734FE3E',
      Environment: 'PROD',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'KL',
    },
    {
      projectName: 'Single Cavity Oven',
      applianceType: 'Oven',
      PNC: '944031897',
      ELC: '00',
      SN: '99000009',
      MAC: '443E070A476D',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'KL',
    },
    {
      projectName: 'Double Cavity Oven',
      applianceType: 'Oven',
      PNC: '944031899',
      ELC: '00',
      SN: '99000001',
      MAC: '443E070A894F',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'KL',
    },
    {
      projectName: 'Single Cavity Oven Simulator',
      applianceType: 'Oven',
      PNC: '944031897',
      ELC: '00',
      SN: '99000004',
      MAC: '443E070A8645',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.6.5',
      Location: 'KL',
    },
    {
      projectName: 'Spartan',
      applianceType: 'PRAC',
      PNC: '999011524',
      ELC: '00',
      SN: '94700001',
      MAC: '443E07021CE1',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'CLUJ',
    },
    {
      projectName: 'Spartan',
      applianceType: 'PRAC',
      PNC: '999011524',
      ELC: '00',
      SN: '90155004',
      MAC: '443E07021ED1',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'CLUJ',
    },
    {
      projectName: 'Mitchell',
      applianceType: 'WRAC',
      PNC: '999011500',
      ELC: '00',
      SN: '90033333',
      MAC: '443E07021E5B',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'CLUJ',
    },

    {
      projectName: 'Mitchell',
      applianceType: 'WRAC',
      PNC: '999011500',
      ELC: '00',
      SN: '90055555',
      MAC: '443E07021AEB',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.9.1',
      Location: 'CLUJ',
    },

    {
      projectName: 'Whitney',
      applianceType: 'WRAC',
      PNC: '999011516',
      ELC: '00',
      SN: '94200054',
      MAC: '443E07022191',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.3.2',
      Location: 'CLUJ',
    },
    {
      projectName: 'Yushan',
      applianceType: 'Dehumidifier',
      PNC: '999011508',
      ELC: '00',
      SN: '90044444',
      MAC: '443E07021C51',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.3.5',
      Location: 'CLUJ',
    },
    {
      projectName: 'PUX',
      applianceType: 'Oven',
      PNC: '944188321',
      ELC: '00',
      SN: '92613731',
      MAC: '443E07021467',
      Environment: 'UAT',
      NIU_TYPE: 'NIU5',
      FirmwareVersion: '1.2.5',
      Location: 'CLUJ',
    },
    {
      projectName: 'Microwave Oven',
      applianceType: 'Oven',
      PNC: '944066532',
      ELC: '00',
      SN: '90817692',
      MAC: '443E07000083',
      Environment: 'UAT',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP47',
      Location: 'CLUJ',
    },
    {
      projectName: 'Elux 100 PS1 Cam Oven',
      applianceType: 'Oven',
      PNC: '944184820',
      ELC: '00',
      SN: '91204143',
      MAC: '70B3D57A6CE1',
      Environment: 'UAT',
      NIU_TYPE: 'GTM3',
      FirmwareVersion: 'BSP56',
      Location: 'CLUJ',
    },
    {
      projectName: 'AEG WM',
      applianceType: 'Washing Machine',
      PNC: '914550903',
      ELC: '00',
      SN: '73100005',
      MAC: '78456182A89E',
      Environment: 'UAT',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '4.3-1.000',
      Location: 'CLUJ',
    },
    {
      projectName: 'Robot Vacuum Cleaner',
      applianceType: 'RVC',
      PNC: '900277470',
      ELC: '00',
      SN: '7108000101100106',
      MAC: '78456182ABCD',
      Environment: 'PROD',
      NIU_TYPE: 'NIUM',
      FirmwareVersion: '4.3-1.000',
      Location: 'CLUJ',
    },
    {
      projectName: 'Himalaya',
      applianceType: 'Air Purifier',
      PNC: '950011383',
      ELC: '00',
      SN: '12900096',
      MAC: '78456182ABCE',
      Environment: 'PROD',
      NIU_TYPE: 'NIUM',
      FirmwareVersion: '4.3-1.000',
      Location: 'CLUJ',
    },
    {
      projectName: 'Mitchell',
      applianceType: 'WRAC',
      PNC: '912076033',
      ELC: '00',
      SN: '15313038',
      MAC: '443E071ADCB9',
      Environment: 'PROD',
      NIU_TYPE: 'NIUL',
      FirmwareVersion: '3.0.0',
      Location: 'CLUJ',
    },
    {
      projectName: 'Diamond',
      applianceType: 'Tumble Dryer',
      PNC: '914550903',
      ELC: '00',
      SN: '23104001',
      MAC: '443E070412F5',
      Environment: 'PROD',
      NIU_TYPE: 'NIUX',
      FirmwareVersion: '3.0.0',
      Location: 'CLUJ',
    },
  ];

  // Serve per filtrare la ricerca
  const [filteredArray, setFilteredArray] = useState(array);
  const searchProjectName = useRef(null);
  const searchApplianceType = useRef(null);
  const searchPNC = useRef(null);
  const searchEnvironment = useRef(null);
  const searchNIU_TYPE = useRef(null);
  const searchLocation = useRef(null);

  // Serve per fare la ricerca
  const search = () => {
    setFilteredArray(
      array.filter((a) => {
        if (
          searchProjectName.current.value &&
          !a.projectName
            .toLowerCase()
            .includes(searchProjectName.current.value.toLowerCase())
        ) {
          return false;
        }
        if (
          searchApplianceType.current.value &&
          !a.applianceType
            .toLowerCase()
            .includes(searchApplianceType.current.value.toLowerCase())
        ) {
          return false;
        }
        if (
          searchPNC.current.value &&
          !a.PNC.toLowerCase().includes(searchPNC.current.value.toLowerCase())
        ) {
          return false;
        }
        if (
          searchEnvironment.current.value &&
          !a.Environment.toLowerCase().includes(searchEnvironment.current.value.toLowerCase())
        ) {
          return false;
        }
        if (
          searchNIU_TYPE.current.value &&
          !a.NIU_TYPE.toLowerCase().includes(searchNIU_TYPE.current.value.toLowerCase())
        ) {
          return false;
        }
        if (
          searchLocation.current.value &&
          !a.Location.toLowerCase().includes(
            searchLocation.current.value.toLowerCase()
          )
        ) {
          return false;
        }
        return true;
      })
    );
  };

  const openMainModal = () => {
    setShowMainModal(true);
  };

  const closeMainModal = () => {
    setShowMainModal(false);
  };

  const openNestedModal = () => {
    handleAddBooking();
    setShowNestedModal(true);
    closeMainModal();
  };

  const closeNestedModal = () => {
    setShowNestedModal(false);
  };

  //Serve per mostrare il modale
  const handleShow = (element) => {
    setSelectedElement(element);
    openMainModal();
  };

  const red = {
    color: 'red',
  };

  const inizio = (date, index, lenght) => {
    if(lenght > 0){
      if(index === 0){
        const string = <p>You have successfully booked your appliance</p>;
        const string2 = "From: ";
        return <><p> {string} <span> {string2} </span><b> {date.toDateString()} </b></p></>;
      }
    }else{
      const string = <p>You have successfully booked your appliance on: </p>;
      return <>{string}<p><b> {date.toDateString()} </b></p></>;
    }
  };

  const fine = (date, index, lenght) => {
    if(lenght === 0){
      return "";
    }
    if(lenght <= 6){
      if (index === lenght){
        const string = " To: ";
        return <><p><span> {string} </span><b> {date.toDateString()} </b></p></>;
      }
    }
    if(lenght > 6){
      if (index === lenght){
      const string = " To: ";
        return <><p><span> {string} </span><b style={red}> {date.toDateString()} </b></p></>;
      }
    }
  };

  return (
    <>
    <html lang="en">
      <header className="p-3 text-bg-dark navbar sticky-top">
        <title>LabMate</title>
        <div className="container-fluid flex">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <img src={Logo} title="Logo" width="200px" height="200px" className="align-center flex"/>
            <form className="" role="search">
              <ul class="d-flex flex-wrap nav justify-content-center mb-md-0" style={{paddingLeft: '5em',}}>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="ProjectName"
                    ref={searchProjectName}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="ApplianceType"
                    ref={searchApplianceType}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="PNC"
                    ref={searchPNC}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="Environment"
                    ref={searchEnvironment}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="NIU_TYPE"
                    ref={searchNIU_TYPE}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="search"
                    class="form-control form-control-dark text-bg-dark"
                    placeholder="Location"
                    ref={searchLocation}
                  ></input>
                </li>
                <li style={{ marginLeft: '0.5rem' }}>
                  <input
                    type="button"
                    class="btn btn-warning ml-auto"
                    onClick={search}
                    value="Search"
                  ></input>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </header>
      <body>
        <table id="table" class="table table-bordered table-hover table-responsive">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Appliance Type</th>
              <th scope="col">PNC</th>
              <th scope="col">ELC</th>
              <th scope="col">SN</th>
              <th scope="col">MAC</th>
              <th scope="col">Environment</th>
              <th scope="col">NIU_TYPE</th>
              <th scope="col">Firmware Version</th>
              <th scope="col">Location</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.map((element, index) => (
              <tr>
                <td scope="row">{element.projectName}</td>
                <td>{element.applianceType}</td>
                <td>{element.PNC}</td>
                <td>{element.ELC}</td>
                <td>{element.SN}</td>
                <td>{element.MAC}</td>
                <td>{element.Environment}</td>
                <td>{element.NIU_TYPE}</td>
                <td>{element.FirmwareVersion}</td>
                <td>{element.Location}</td>
                <td>
                  <button type="button" class="btn btn-warning" onClick={() => handleShow(element)}>Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
      <Modal 
        size="xl"
        dialogClassName="custom-modal"
        show={showMainModal} 
        onHide={closeMainModal} 
      >
        <Modal.Header closeButton>
          <Modal.Title className="mx-auto">You are booking {selectedElement?.projectName} - {selectedElement?.MAC} - {selectedElement?.Environment}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row className="row align-items-center">
              <Col className="col">
                <div stryle="display: 'flex', alignItems: 'center',">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    /*
                    showTimeSelect
                    dateFormat="Pp"
                    */
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    excludeDates={bookedDates}
                    filterDate={(filterWeekend)} // Filtra i  weekend
                    minDate={new Date()} // Imposta la data minima selezionabile a "oggi"
                    filterDate={(filterPastDates)} // Filtra i giorni precedenti a "oggi"
                    dayClassName={redWeekend} //Avere i weekend in rosso
                    showWeekNumbers
                    //strictParsing
                    monthsShown={2}
                    className="mx-5"
                  />
                  <p>
                    <i className="text-warning">
                    *Limit of 5 business day
                    </i>
                  </p>
                </div>
              </Col>
              <Col className="col">
          <p>
            <b>
             Would you like to change some information about this appliance?
             Fill the proper field with what you want to change.
             </b>
          </p>
          <Row className="g-2">
            <FloatingLabel controlId="floatingInput1" label="PNC" >
              <Form.Control type="text" placeholder={selectedElement?.PNC} />
            </FloatingLabel>
          </Row>
            <br></br>
          <Row className="g-2">
            <FloatingLabel controlId="floatingInput2" label="ELC">
              <Form.Control type="text" placeholder={selectedElement?.ELC} />
            </FloatingLabel>
          </Row>
          <br></br>
          <Row className="g-2">
            <FloatingLabel controlId="floatingInput3" label="SN">
              <Form.Control type="text" placeholder={selectedElement?.SN} />
            </FloatingLabel>
          </Row>
          <br></br>
          <Row className="g-2">
            <FloatingLabel controlId="floatingInput4" label="Environment">
              <Form.Control type="text" placeholder={selectedElement?.Environment} />
            </FloatingLabel>
          </Row>
          <br></br>
          <Row className="g-2">
            <FloatingLabel controlId="floatingInput5" label="Firmware Version">
              <Form.Control type="text" placeholder={selectedElement?.FirmwareVersion} />
            </FloatingLabel>
          </Row>
          <br></br>
            <Row className="g-2">
            <FloatingLabel controlId="floatingInput6" label="Notes">
              <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }}/>
            </FloatingLabel>
            </Row>          
          </Col>
          </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeMainModal}>
            Cancel
          </Button>
          <Button variant="warning" onClick={openNestedModal}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNestedModal} onHide={closeNestedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookedDates.map((date, index) => (
            inizio(date, index, (bookedDates.length.toString()-1))))}
            {bookedDates.map((date, index) => (
              fine(date, index, (bookedDates.length.toString()-1))))}
            <br></br> 
            <p>
              <b>
                If you need the appliance to be registered in a specific account, please insert the credentials here:
                </b>
              <br></br>
              <br></br>
            <Row className="g-2">
              <FloatingLabel controlId="floatingInput" label="Email">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Row>
            <br></br>
            <Row className="g-2">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </Row>
            </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={closeNestedModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </html>
    </>
  );
};
export default LabMate;