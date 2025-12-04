#include <QCoreApplication>

#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QRegularExpression>
#include <QTextStream>
#include <QFile>

static QString SBLGNT_PATH = "../sblgnt-to-sqlite/sblgnt.db";
static QString SBLGNT = "SBLGNT";

void openSblGnt()
{
    QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE", SBLGNT);
    db.setDatabaseName(SBLGNT_PATH);
    db.open();

    if( !db.isOpen() )
    {
        qCritical() << "Database is not open.";
        return;
    }
}

int firstWord(const QString & reference)
{
    QSqlQuery q(QSqlDatabase::database(SBLGNT));
    if( !q.prepare("SELECT MIN(_id) FROM sblgnt WHERE reference=?;") )
    {
        qCritical() << "firstWord Prepare failed." << q.lastError();
        return -1;
    }
    q.bindValue(0, reference);
    if( !q.exec() || !q.next() )
    {
        qCritical() << "firstWord exec failed";
        return -1;
    }
    return q.value(0).toInt();
}

int lastWord(const QString & reference)
{
    QSqlQuery q(QSqlDatabase::database(SBLGNT));
    if( !q.prepare("SELECT MAX(_id) FROM sblgnt WHERE reference=?;") )
    {
        qCritical() << "lastWord Prepare failed." << q.lastError();
        return -1;
    }

    q.bindValue(0, reference);
    if( !q.exec() || !q.next() )
    {
        qCritical() << "lastWord exec failed";
        return -1;
    }
    return q.value(0).toInt();
}

QString sanitize(const QString &original, bool &changed)
{
    static QRegularExpression letter("[A-z]", QRegularExpression::UseUnicodePropertiesOption);
    QString replaced = original;
    replaced.replace(letter,"");
    changed = replaced != original;
    return replaced;
}

QPair<QString,QString> produceReference(const QString & book, const QString & str)
{
    static QRegularExpression singleVerse("^(\\d+)\\.(\\d+)$");
    static QRegularExpression verseRange("^(\\d+)\\.(\\d+)-(\\d+)$");
    static QRegularExpression verseChapterRange("^(\\d+)\\.(\\d+)-(\\d+)\\.(\\d+)$");

    QRegularExpressionMatch match = singleVerse.match(str);
    if( match.hasMatch() )
    {
        const QString reference = QString("%1 %2:%3").arg(book).arg(match.capturedTexts().at(1)).arg(match.capturedTexts().at(2));
        return QPair<QString,QString>(reference,reference);
    }

    match = verseRange.match(str);
    if( match.hasMatch() )
    {
        const QString first = QString("%1 %2:%3").arg(book).arg(match.capturedTexts().at(1)).arg(match.capturedTexts().at(2));
        const QString second = QString("%1 %2:%3").arg(book).arg(match.capturedTexts().at(1)).arg(match.capturedTexts().at(3));
        return QPair<QString,QString>(first,second);
    }

    match = verseChapterRange.match(str);
    if( match.hasMatch() )
    {
        const QString first = QString("%1 %2:%3").arg(book).arg(match.capturedTexts().at(1)).arg(match.capturedTexts().at(2));
        const QString second = QString("%1 %2:%3").arg(book).arg(match.capturedTexts().at(3)).arg(match.capturedTexts().at(4));
        return QPair<QString,QString>(first,second);
    }

    return QPair<QString,QString>("","");
}

void updateFile(const QString & bookCode, const QString & inPath, const QString & outPath)
{
    QFile outFile(outPath);
    if (! outFile.open(QFile::WriteOnly))
    {
        qInfo() << "Can't open:" << outPath;
        return;
    }
    QTextStream out(&outFile);

    QFile inFile(inPath);
    if (! inFile.open(QFile::ReadOnly))
    {
        qInfo() << "Can't open:" << inPath;
        return;
    }

    QTextStream stream(&inFile);
    QString line;
    while (stream.readLineInto(&line))
    {
        const QStringList bits = line.split("\t");
        if( bits.length() != 3)
        {
            qInfo() << "Expected three items but got:" << line;
            return;
        }

        const int sectionNumber = bits.value(0).toInt();
        const int canon = bits.value(1).toInt();
        QString ref = bits.value(2);

        bool wasSanitized;
        const QString sanitized = sanitize(ref, wasSanitized);
        QPair<QString,QString> refs = produceReference(bookCode,sanitized);

        /// output the result
        out << sectionNumber << "\t"
            << canon << "\t"
            << ref << "\t"
            << refs.first << "\t"
            << refs.second  << "\t"
            << firstWord(refs.first) << "\t"
            << lastWord(refs.second) << "\t"
            << wasSanitized << Qt::endl;
    }

    outFile.close();
    inFile.close();
}

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);

    openSblGnt();

    updateFile("MAT","data/MAT-sections.txt","data/MAT-sections-automatic.txt");
    updateFile("MRK","data/MRK-sections.txt","data/MRK-sections-automatic.txt");
    updateFile("LUK","data/LUK-sections.txt","data/LUK-sections-automatic.txt");
    updateFile("JHN","data/JHN-sections.txt","data/JHN-sections-automatic.txt");

    return 0;
}
