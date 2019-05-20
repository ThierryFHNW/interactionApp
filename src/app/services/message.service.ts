import { Injectable } from '@angular/core';
import {SettingsService} from './settings.service';
import {Observable, BehaviorSubject} from 'rxjs';
import {MessageLevel} from '../models/messagelevel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * this object represents a Message that gets send by this service
 */
export class AlertMessage {
  message: string;
  level: MessageLevel;

  constructor(message: string, level: MessageLevel) {
    this.message = message;
    this.level = level;
  }
}

/**
 * this class is used for logging and user notifcation
 * to consume messages use getObservable() and subscribe to the observable
 * to send messages to consumers use sendMessage() and its helper functions
 */
@Injectable()
export class MessageService {

  private subject = new BehaviorSubject<AlertMessage>(null);

  constructor(private settingsService: SettingsService) {
  }

  /**
   * this functions returns an observable that receives all AlertMessages
   * @returns {Observable<AlertMessage>} an Observable that can be subcribed to
   */
  getObservable(): Observable<AlertMessage> {
    return this.subject.asObservable();
  }

  /**
   * send a message to all eligible subscriber and prints it to the console if necessary
   * the settingsservice contains the options about the log levels
   * @param {string} message the message to send
   * @param {MessageLevel} level the level the message has
   */
  sendMessage(message: string, level: MessageLevel): void {
    if (environment.logLevel <= level) {
      console.log(`${MessageLevel[level]}: ${message}`);
    }
    if (environment.alertLevel <= level) {
      const alertmessage = new AlertMessage(message, level);
      this.subject.next(alertmessage);
    }
  }

  /**
   * this calls sendMessage with the MessageLevel.TRACE
   * @param {string} message the message to send
   */
  sendTrace(message: string): void {
    this.sendMessage(message, MessageLevel.TRACE);
  }

  /**
   * this calls sendMessage with the MessageLevel.DEBUG
   * @param {string} message the message to send
   */
  sendDebug(message: string): void {
    this.sendMessage(message, MessageLevel.DEBUG);
  }

  /**
   * this calls sendMessage with the MessageLevel.INFO
   * @param {string} message the message to send
   */
  sendInfo(message: string): void {
    this.sendMessage(message, MessageLevel.INFO);
  }

  /**
   * this calls sendMessage with the MessageLevel.WARN
   * @param {string} message the message to send
   */
  sendWarn(message: string): void {
    this.sendMessage(message, MessageLevel.WARN);
  }

  /**
   * this calls sendMessage with the MessageLevel.ERROR
   * @param {string} message the message to send
   */
  sendError(message: string): void {
    this.sendMessage(message, MessageLevel.ERROR);
  }
}



