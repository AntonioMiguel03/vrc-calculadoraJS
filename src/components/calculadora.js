import React, { useState, useEffect } from 'react';
import styles from './Calculadora.module.css';
import * as math from 'mathjs';

const Calculadora = () => {
    const [display, setDisplay] = useState('');
    const [resultado, setResultado] = useState('');
    const [operadorPressionado, setOperadorPressionado] = useState(false);
    const [botaoIgualHabilitado, setBotaoIgualHabilitado] = useState(true);

    useEffect(() => {
        // Verifique se o botão igual deve ser habilitado
        const ultimoCaractere = display.slice(-1);

        if (ultimoCaractere === '+' || ultimoCaractere === '-' || ultimoCaractere === '*' || ultimoCaractere === '/') {
            setOperadorPressionado(true);
        } else {
            setOperadorPressionado(false);
        }
    }, [display]);

    const handleClick = (value) => {
        if (value === '=') {
            if (!operadorPressionado) {
                try {
                    setResultado(calcularResultado(display).toString());
                } catch (error) {
                    setResultado('Erro');
                }
                setBotaoIgualHabilitado(false); // Desabilita todos os botões, exceto "C"
            }
        } else if (value === 'C') {
            setDisplay('');
            setResultado('');
            setBotaoIgualHabilitado(true); // Habilita todos os botões novamente
        } else {
            if (!botaoIgualHabilitado) {
                return;
            }

            // Verifique se o valor é um operador e o último caractere também é um operador
            if ('+-*/'.includes(value) && '+-*/'.includes(display.slice(-1))) {
                return;
            }

            setDisplay(display + value);
        }
    };

    const calcularResultado = (expression) => {
        if (expression.includes('!')) {
            const number = parseInt(expression);
            return calcularFatorial(number);
        } else if (expression.includes('√')) {
            const number = parseFloat(expression.slice(1));
            return Math.sqrt(number);
        } else {
            try {
                return math.evaluate(expression);
            } catch (error) {
                return 'Erro';
            }
        }
    };

    const calcularFatorial = (n) => {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    return (
        <div className={styles.calculadoraContainer}>
            <div className={styles.visor}>
                <input type="text" value={display} readOnly />
                <div className={styles.resultado}>{resultado}</div>
            </div>
            <div className={styles.teclado}>
                <button onClick={() => handleClick('7')}>7</button>
                <button onClick={() => handleClick('8')}>8</button>
                <button onClick={() => handleClick('9')}>9</button>
                <button onClick={() => handleClick('+')}>+</button>
                <button onClick={() => handleClick('4')}>4</button>
                <button onClick={() => handleClick('5')}>5</button>
                <button onClick={() => handleClick('6')}>6</button>
                <button onClick={() => handleClick('-')}>-</button>
                <button onClick={() => handleClick('1')}>1</button>
                <button onClick={() => handleClick('2')}>2</button>
                <button onClick={() => handleClick('3')}>3</button>
                <button onClick={() => handleClick('*')}>*</button>
                <button onClick={() => handleClick('0')}>0</button>
                <button onClick={() => handleClick('.')}>.</button>
                <button onClick={() => handleClick('=')} disabled={!botaoIgualHabilitado}>=</button>
                <button onClick={() => handleClick('/')} disabled={!botaoIgualHabilitado || operadorPressionado}>/</button>
                <button onClick={() => handleClick('!')} disabled={!botaoIgualHabilitado || operadorPressionado}>!</button>
                <button onClick={() => handleClick('C')}>C</button>
                <button onClick={() => handleClick('√')} disabled={!botaoIgualHabilitado || operadorPressionado}>√</button>
            </div>
        </div>
    );
};

export default Calculadora;