import { LocationState, Path } from 'history';

export default interface History {
    push(path: Path, state?: LocationState): void;
}
