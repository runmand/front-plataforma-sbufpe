import EventEmitter from 'events';

export const emitter = new EventEmitter();

export const createListener = (key: string, callback: (...args: any[]) => void) => {
	if (emitter.eventNames().filter(eventName => eventName === key).length > 0) {
		console.info(`Event duplicated. Key: ${key}`);
		return;
	}
	emitter.on(key, callback);
};
