import * as Bluebird from 'bluebird';

export function waitUntil(truthFunction: () => boolean, timeoutInMs: number, failureMessage: string) {
    return Bluebird.resolve(waitUntilInner(truthFunction))
        .timeout(timeoutInMs, failureMessage);
}

async function waitUntilInner(truthFunction: () => boolean): Promise<any> {
    if (truthFunction()) {
        return;
    } else {
        await Bluebird.delay(10);
        return await waitUntilInner(truthFunction);
    }
}