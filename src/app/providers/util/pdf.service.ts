import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Injectable} from '@angular/core';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfService {
  pdfMake: any;

  constructor() { }

  public loadPdfMaker = async () => {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  public generatePdf = async (content: any) => {
    await this.loadPdfMaker();
    this.pdfMake.createPdf(content).open();
  }
}
