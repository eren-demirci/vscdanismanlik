import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const ad = formData.get('ad') as string;
    const soyad = formData.get('soyad') as string;
    const email = formData.get('email') as string;
    const telefon = formData.get('telefon') as string;
    const pozisyon = formData.get('pozisyon') as string;
    const mesaj = formData.get('mesaj') as string;
    const cv = formData.get('cv') as File | null;

    if (!ad || !soyad || !email || !telefon) {
      return NextResponse.json(
        { error: 'Lütfen zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = `
      <h2>Yeni Kariyer Başvurusu</h2>
      <p><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${telefon}</p>
      ${pozisyon ? `<p><strong>Pozisyon:</strong> ${pozisyon}</p>` : ''}
      ${mesaj ? `<p><strong>Ön Yazı:</strong></p><p>${mesaj.replace(/\n/g, '<br>')}</p>` : ''}
    `;

    const attachments: { filename: string; content: Buffer }[] = [];
    if (cv && cv.size > 0) {
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({ filename: cv.name, content: buffer });
    }

    const mailOptions = {
      from: `"${ad} ${soyad}" <${process.env.EMAIL_USER}>`,
      to: process.env.KARIYER_EMAIL ?? process.env.EMAIL_USER,
      replyTo: email,
      subject: `Kariyer Başvurusu — ${ad} ${soyad}${pozisyon ? ` (${pozisyon})` : ''}`,
      html,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.',
    });
  } catch (error: any) {
    console.error('Kariyer email failed:', error);
    return NextResponse.json(
      { error: 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
