import { useState } from 'react';
import { } from 'antd';
import './App.css';

function App() {
  const [vals, setVals] = useState({
    price: '70000',
    down: '20',
    rate: '3.75',
    term: '25',
    cc: '',
  })
  const amort = (pv, n, r) => {
    const monthlyRate = r / 12
    const payment = pv * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -n)));

    let balance = pv;
    const amortTable = [];
    /**
     * Loop that calculates the monthly Loan amortization amounts then adds
     * them to the return string
     */
    for (let count = 0; count < n; ++count) {
      // collect the data
      const tableRow = {
        month: 0,
        balance: '',
        interest: '',
        monthlyPrincipal: '',
      };

      // in-loop interest amount holder
      let interest = 0;

      // in-loop monthly principal amount holder
      let monthlyPrincipal = 0;

      // add month number in col 1 using the loop count variable
      tableRow.month = (count + 1);

      // code for displaying in loop balance
      tableRow.balance = balance.toFixed(2);

      // calc the in-loop interest amount and display
      interest = balance * monthlyRate;
      tableRow.interest = interest.toFixed(2);

      // calc the in-loop monthly principal and display
      monthlyPrincipal = payment - interest;
      tableRow.monthlyPrincipal = monthlyPrincipal.toFixed(2);

      amortTable.push(tableRow);

      //update the balance for each loop iteration
      balance = balance - monthlyPrincipal;
    }

    return { payment: payment.toFixed(2), amortTable }
  }
  const parseInputs = (values) => {
    const { rate, price, term, down } = values;
    const parsedDown = parseFloat(down) / 100 * price
    const parsedPrice = parseFloat(price - parsedDown)
    const parsedRate = parseFloat(rate) / 100
    const parsedTerm = parseInt(term) * 12
    return {
      parsedTerm,
      parsedRate,
      parsedPrice,
    }
  }
  const validateInputs = ([, val]) => !(val === null || val === '')
  const isTrue = (val) => val === true
  const handleChange = e => setVals({ ...vals, [e.target.name]: e.target.value })
  const calculate = () => {
    const validInputs = Object.entries(vals)
      .map(validateInputs)
      .some(isTrue)
    if (validInputs) {
      // do stuff
      const { parsedPrice, parsedTerm, parsedRate } = parseInputs(vals)
      const { payment, amortTable } = amort(parsedPrice, parsedTerm, parsedRate);
      console.log({ parsedPrice, parsedRate, parsedTerm, payment, amortTable })
    } else {
      return false
    }
  }
  return (
    <Container className="App">
      <Radio.Group value={formLayout}>
        <Radio.Button value="horizontal">Horizontal</Radio.Button>
        <Radio.Button value="vertical">Vertical</Radio.Button>
        <Radio.Button value="inline">Inline</Radio.Button>
      </Radio.Group>
      <Div>
        <header className="App-header">
          <pre>{JSON.stringify(vals, null, 2)}</pre>
          <Row m={{ b: '1rem' }}>
            <Col>
              <label>Sale Price: </label>
            </Col>
            <Col>
              <Input h="2rem" name="price" value={vals.price} onChange={handleChange} />
            </Col>
          </Row>
          <Row m={{ b: '1rem' }}>
            <Col>
              <label>Downpayment %:</label>
            </Col>
            <Col>
              <Input h="2rem" name="down" value={vals.down} onChange={handleChange} />
            </Col>
          </Row>
          <Row m={{ b: '1rem' }}>
            <Col>
              <label>Interest %:</label>
            </Col>
            <Col>
              <Input h="2rem" name="rate" value={vals.rate} onChange={handleChange} />
            </Col>
          </Row>
          <Row m={{ b: '1rem' }}>
            <Col>
              <label>Term (yrs):</label>
            </Col>
            <Col>
              <Input h="2rem" name="term" value={vals.term} onChange={handleChange} />
            </Col>
          </Row>
          <Row m={{ b: '1rem' }}>
            <Col>
              <label>Closing Costs:</label>
            </Col>
            <Col>
              <Input h="2rem" name="cc" value={vals.cc} onChange={handleChange} />
            </Col>
          </Row>
          <button onClick={calculate}>Calculate</button>
        </header>
      </Div>
    </Container>
  );
}

export default App;
