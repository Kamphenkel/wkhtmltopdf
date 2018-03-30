#!/bin/sh

DL_URL='https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz';
echo "download URL: $DL_URL";

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

DEST_DIR="$DIR/.bin/";
#echo "install location: $DEST_DIR";
mkdir -p $DEST_DIR

WGET=$(which wget);
if [[ "$?" != 0 ]]; then
	echo "cant find wget!";
	exit 1;
fi
#echo "wget is at: $WGET";

TAR=$(which tar);
if [[ "$?" != 0 ]]; then
	echo "cant find tar!";
	exit 1;
fi
#echo "tar is at: $TAR";

$WGET -qO- --show-progress $DL_URL | $TAR -xvJ -C $DEST_DIR
if [[ "$?" != 0 ]]; then
	echo "installation failed!";
	exit 1;
fi

echo;
echo "installed wkhtmltox at $DEST_DIR";

