import { ShallowWrapper } from 'enzyme';

export function getInputBySelector(wrapper: ShallowWrapper, selector: string) {
    let findResult = wrapper.update().find(selector);
    expect(findResult.length).toBe(1);
    return findResult.first();
}

export function setInputValue(input: any, value: string) {
    input.value = value;
    input.simulate('change', { target: input });
}

export function simulateSubmit(wrapper: ShallowWrapper<any, any>, selector: string) {
    wrapper.find(selector).simulate('submit', {
        preventDefault() {
            // no-op
        }
    });
}