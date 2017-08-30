import { VirtualPrinter } from '@printing/VirtualPrinter'
import { CloudDeviceDefinition } from '@printing/VirtualPrinterCapabilities'

export type CapabilityRequestedCallback = (capabilities: PrinterCapabilities) => void
export type PrintersRequestedCallback = (printers: PrinterInfo[]) => void
export type PrintRequestedCallback = (result: string) => void

export type PrinterCapabilities = chrome.printerProvider.PrinterCapabilities
export type PrinterInfo = chrome.printerProvider.PrinterInfo
export type PrintJob = chrome.printerProvider.PrintJob

export type PrintJobHandler = (printJob: PrintJob) => void

const PrinterId: string = 'printer-manager'

export class PrinterManager {
  private readonly handler: PrintJobHandler
  private readonly printers: Map<string, VirtualPrinter> = new Map<string, VirtualPrinter>()

  constructor(handler: PrintJobHandler) {
    this.handler = handler
    this.initialize()
  }

  public add(printer: VirtualPrinter): PrinterManager {
    this.printers.set(printer.id, printer)
    return this
  }

  public get(printerId: string): VirtualPrinter | undefined {
    return this.printers.get(printerId)
  }

  public remove(printerId: string): PrinterManager {
    this.printers.delete(printerId)
    return this
  }

  private initialize(): void {
    chrome.printerProvider.onGetCapabilityRequested.addListener(this.onGetCapabilityRequested)
    chrome.printerProvider.onGetPrintersRequested.addListener(this.onGetPrintersRequested)
    chrome.printerProvider.onPrintRequested.addListener(this.onPrintRequested)
  }

  private uninitialize(): void {
    chrome.printerProvider.onPrintRequested.removeListener(this.onPrintRequested)
    chrome.printerProvider.onGetPrintersRequested.removeListener(this.onGetPrintersRequested)
    chrome.printerProvider.onGetCapabilityRequested.removeListener(this.onGetCapabilityRequested)
  }

  private onGetCapabilityRequested = (printerId: string, resultCallback: CapabilityRequestedCallback): void => {
    if (this.printers.has(printerId)) {
      resultCallback(CloudDeviceDefinition)
    }
  }

  private onGetPrintersRequested = (resultCallback: PrintersRequestedCallback): void => {
    const printerInfos: PrinterInfo[] = Array.from(this.printers.values())
      .map((printer: VirtualPrinter) => ({
        description: `Virtual Printer: ${printer.name}`,
        id: printer.id,
        name: printer.name,
      }))
    resultCallback(printerInfos)
  }

  private onPrintRequested = (printJob: PrintJob, resultCallback: PrintRequestedCallback): void => {
    resultCallback('OK')
    this.handler(printJob)
  }
}
