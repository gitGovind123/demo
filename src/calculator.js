import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'

export const CURRENCY_RELATION = {
    "AUD": {
        "AUD": "1:1",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "USD",
        "NZD": "USD",
        "USD": "D",
        "decimal": 2
    },
    "CAD": {
        "AUD": "USD",
        "CAD": "1:1",
        "CNY": "USD",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "USD",
        "NZD": "USD",
        "USD": "D",
        "decimal": 2
    },
    "CNY": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "1:1",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "USD",
        "NZD": "USD",
        "USD": "Inv",
        "decimal": 2
    },
    "CZK": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "1:1",
        "DKK": "EUR",
        "EUR": "Inv",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "EUR",
        "NZD": "USD",
        "USD": "EUR",
        "decimal": 2
    },
    "DKK": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "EUR",
        "DKK": "1:1",
        "EUR": "Inv",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "EUR",
        "NZD": "USD",
        "USD": "EUR",
        "decimal": 2
    },
    "EUR": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "D",
        "DKK": "D",
        "EUR": "1:1",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "D",
        "NZD": "USD",
        "USD": "D",
        "decimal": 2
    },
    "GBP": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "1:1",
        "JPY": "USD",
        "NOK": "USD",
        "NZD": "USD",
        "USD": "D",
        "decimal": 2
    },
    "JPY": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "USD",
        "JPY": "1:1",
        "NOK": "USD",
        "NZD": "USD",
        "USD": "Inv",
        "decimal": 0
    },
    "NOK": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "EUR",
        "DKK": "EUR",
        "EUR": "Inv",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "1:1",
        "NZD": "USD",
        "USD": "Inv",
        "decimal": 2
    },
    "NZD": {
        "AUD": "USD",
        "CAD": "USD",
        "CNY": "USD",
        "CZK": "USD",
        "DKK": "USD",
        "EUR": "USD",
        "GBP": "USD",
        "JPY": "USD",
        "NOK": "USD",
        "NZD": "1:1",
        "USD": "D",
        "decimal": 2
    },
    "USD": {
        "AUD": "Inv",
        "CAD": "Inv",
        "CNY": "D",
        "CZK": "EUR",
        "DKK": "EUR",
        "EUR": "Inv",
        "GBP": "Inv",
        "JPY": "D",
        "NOK": "EUR",
        "NZD": "Inv",
        "USD": "1:1",
        "decimal": 2
    }
}

export const CURRENCY_RATES = {
    "AUDUSD": 0.8371,
    "CADUSD": 0.8711,
    "USDCNY": 6.1715,
    "EURUSD": 1.2315,
    "GBPUSD": 1.5683,
    "NZDUSD": 0.7750,
    "USDJPY": 119.95,
    "EURCZK": 27.6028,
    "EURDKK": 7.4405,
    "EURNOK": 8.6651
}

const Calculator = props => {
    const [base, setBase] = useState('AUD')
    const [term, setTerm] = useState('AUD')
    const [baseValue, setBaseValue] = useState("")
    const [termValue, setTermValue] = useState("")

    useEffect(() => {
        if (baseValue > 0) {
            const result = calculate({base, term, result: baseValue})
            setTermValue(result)
        } else {
            setTermValue("")
        }
    }, [term, base, baseValue])

    const calculate = ({base, term, result}) => {
        const findRelation = CURRENCY_RELATION[base] && CURRENCY_RELATION[base][term]
        if (findRelation) {
            if (findRelation === '1:1') {
                return result
            } else if (findRelation === 'D') {
                const rate = CURRENCY_RATES[`${base}${term}`]
                return result * rate
            } else if (findRelation === 'Inv') {
                const rate = CURRENCY_RATES[`${term}${base}`]
                return result / rate
            } else {
                result = calculate({base, term: findRelation, result})
                return calculate({base: findRelation, term, result})
            }
        }
    }

    const onCurrencyChange = ({target: {value}}) => {
        setBaseValue(value)
    }

    return (
        <div className={'container'}>
            <div className='main-content'>
                <header className='App-header'>
                    <h4>{props.title || 'Fx Calculator'}</h4>
                </header>
                <div className={'content'}>
                    <label>From</label>
                    <select
                        className={'currency-select'}
                        data-test-key='from-select'
                        name='base'
                        onChange={(e)=>setBase(e.target.value)}
                        value={base}
                    >
                        {
                            Object.keys(CURRENCY_RELATION).map((item, index)=>{
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <NumberFormat
                        className={'currency-input'}
                        data-test-key='base-input'
                        decimalScale={
                            CURRENCY_RELATION[base] &&
                            CURRENCY_RELATION[base].decimal
                                ? CURRENCY_RELATION[base].decimal
                                : 0
                        }
                        value={baseValue}
                        onChange={onCurrencyChange}
                    />
                </div>
                <div className={'content'}>
                    <label>To</label>
                    <select
                        className={'currency-select'}
                        data-test-key='to-select'
                        name='term'
                        onChange={(e)=>setTerm(e.target.value)}
                        value={term}
                    >
                        {
                            Object.keys(CURRENCY_RELATION).map((item, index)=>{
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                    <NumberFormat
                        className={'currency-input'}
                        disabled
                        data-test-key='term-input'
                        decimalScale={
                            CURRENCY_RELATION[term] &&
                            CURRENCY_RELATION[term].decimal
                                ? CURRENCY_RELATION[term].decimal
                                : 0
                        }
                        value={
                            termValue
                                ? `${termValue}`
                                : ''
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Calculator