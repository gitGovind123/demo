import {render, fireEvent} from "@testing-library/react";
import Calculator from "./calculator";

it('Renders calculator component', () => {
    const { container } = render(<Calculator />);
    const selectElementFrom = container.querySelector('[data-test-key="from-select"]')
    expect(selectElementFrom).toBeInTheDocument();

    const selectElementTo = container.querySelector('[data-test-key="to-select"]')
    expect(selectElementTo).toBeInTheDocument();
});

it('Select default value should be AUD', ()=> {
    const { container } = render(<Calculator />);
    const selectElementFrom = container.querySelector('[data-test-key="from-select"]')
    expect(selectElementFrom.value).toBe("AUD")

    const selectElementTo = container.querySelector('[data-test-key="to-select"]')
    expect(selectElementTo.value).toBe("AUD")
})

test('AUD = 100 should have 83.71 USD', ()=> {
    const { container } = render(<Calculator />);
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')

    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')

    fireEvent.change(baseInput, { target: { value: '100' } })

    base.value = 'AUD';
    fireEvent.change(base)

    term.value = 'USD';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("83.71")
})

test('AUD = 100 should have 100 AUD', () => {
    const { container } = render(<Calculator />);
    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')
    base.value = 'AUD';
    fireEvent.change(base)
    fireEvent.change(baseInput, { target: { value: '100' } })

    term.value = 'AUD';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("100")
})

test('AUD = 100 should have 505.76 DKK', () => {
    const { container } = render(<Calculator />)
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')
    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')

    base.value = 'AUD';
    fireEvent.change(base)
    fireEvent.change(baseInput, { target: { value: '100' } })

    term.value = 'DKK';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("505.76")
})
test('JPY = 100 should have 0.83 USD', () => {
    const { container } = render(<Calculator />)
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')
    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')


    base.value = 'JPY';
    fireEvent.change(base)
    fireEvent.change(baseInput, { target: { value: '100' } })

    term.value = 'USD';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("0.83")
})

test('AUD = 100 should have 516.61 CNY', () => {
    const { container } = render(<Calculator />)
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')
    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')


    base.value = 'AUD';
    fireEvent.change(base)
    fireEvent.change(baseInput, { target: { value: '100' } })

    term.value = 'CNY';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("516.61")
})

test('Unable to find rate of KRM / FJD', () => {
    const { container } = render(<Calculator />)
    const base = container.querySelector('[data-test-key="from-select"]')
    const baseInput = container.querySelector('[data-test-key="base-input"]')
    const term = container.querySelector('[data-test-key="to-select"]')
    const termInput = container.querySelector('[data-test-key="term-input"]')


    base.value = 'KRM';
    fireEvent.change(base)
    fireEvent.change(baseInput, { target: { value: '100' } })

    term.value = 'FZD';
    fireEvent.change(term)

    expect(baseInput.value).toEqual("100")
    expect(termInput.value).toEqual("")
})