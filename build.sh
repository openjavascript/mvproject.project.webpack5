#!/bin/sh
#git pull;


rm -rf src/static/*hot-update*
rm -rf src/static/js/*hot-update*


# 燕尾服目录
STC_PATH="../stc/src/"

# 工作目录
path=`dirname $0`;
first=${path:0:1};
if [[ $first != '/' ]];then
    path=$(pwd);
fi

# 准备环境
SRC_DIR="${path}/src";
OUTPUT_DIR="${path}/output";
TEMP_DIR="${OUTPUT_DIR}/temp";

echo "clear '${OUTPUT_DIR}/temp/'";
rm -rf "${OUTPUT_DIR}/temp/";
rm -rf "${OUTPUT_DIR}/html/";
mkdir -p "${TEMP_DIR}/html/";


echo "copy resources";
cp -r "${SRC_DIR}/static/" "${TEMP_DIR}/static/";
cp -r `find "${SRC_DIR}/" -name *.html -maxdepth 1` "${TEMP_DIR}/html/";

# 燕尾服编译
echo "run stc";
cp -r "${path}/config.php" "${TEMP_DIR}/config.php";
/usr/local/bin/php "${STC_PATH}/index.php" "${TEMP_DIR}/" test $1;
if [ -f ${path}"/stc.error.log" ]; then
    rm -rf ${path}"/stc.error.log";
    #exit 1;
fi

cp -r `find ${TEMP_DIR}/output/html/ -iname *.html` "${OUTPUT_DIR}/";


# 清空临时目录
rm -rf "${TEMP_DIR}/";
echo "Built done.";

