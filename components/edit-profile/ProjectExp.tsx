"use client";
import { Button } from "@nextui-org/react";
import { useState, useEffect, memo } from 'react';
import { httpPost, httpGet } from "@/lib/api";
import { UserInfo, ProjectExpType } from "@/types";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, DateRangePicker, Textarea} from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import moment from "moment";
import ChipSelector from './ChipSelector';
import { BsUpload, BsPlus, BsDash, BsFillXCircleFill } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import cloneDeep from 'lodash/cloneDeep';
import { useTranslation } from 'react-i18next';

const ProjectExp = ({
    userProfile,
    init,
  }: {
    userProfile: UserInfo;
    init: () => void;
  }) => {
    const { t } = useTranslation();
    const [ isUpdated, setUpdated ] = useState(false)
    type Column = {
        name: string;
        id: string;
        width?: string;
    }

    const columns: Column[] = [
        {
            name: t('profile.durationTime'),
            id: "durationTime",
            width: "20%",
        },
        {
            name: t('profile.technologyStack'),
            id: "technology_stack",
        },
        {
            name: t('profile.company'),
            id: "company_name",
            width: "10%",
        },
        {
            name: t('profile.projectDetails'),
            id: "details",
        },
        {
            name: t('profile.file'),
            id: "filePath",
            width: "10%",
        },
        {
            name: t('profile.actions'),
            id: "actions",
            width: "120px",
        },
    ];

    const initialItem = {
        order: 0,
        timestamp: Date.now(),
        durationTime: [Date.now() - 1000 * 60 * 60 * 24 * 30, Date.now()],
        technology_stack: [],
        company_name: "",
        details: "",
    };

    const [ projectExpList, setProjectExpList ] = useState([
        initialItem,
      ]);

    const renderCell = (item: ProjectExpType, columnKey: React.Key, index: number) => {
        const handleChangeValue = (data:  ProjectExpType[keyof ProjectExpType]) => {
            setProjectExpList((list: ProjectExpType[]) => {
                const newList = cloneDeep(list);
                newList[index] = {
                    ...newList[index],
                    [columnKey as keyof ProjectExpType]: data,
                };
                setUpdated(true);
                return newList;
            });
        };

        const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return;
            }
            console.log(e.target.files, 'e.target.files');
            if (e.target.files[0].size / 1024 / 1024 > 10) {
                window.enqueueSnackbar('最大上传10M', { variant: "error" } );
                return;
            }
            const payload = new FormData();
            payload.append('file', e.target.files[0]);
            const result = await httpPost(`${window.location.origin}/api/file/upload`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data; boundary=----"
                }
            } as any) as ProjectExpType;
            setProjectExpList((list: ProjectExpType[]) => {
                const newList = cloneDeep(list);
                newList[index] = {
                    ...newList[index],
                    ...result,
                };
                setUpdated(true);
                return newList;
            });
        }

        const handleAddItem = () => {
            setProjectExpList((list: ProjectExpType[]) => {
                const newList = cloneDeep(list);
                newList.splice(index + 1, 0, {
                    ...initialItem,
                    timestamp: Date.now(),
                })
                setUpdated(true);
                return newList;
            });
        };

        const handleDeleteItem = () => {
            setProjectExpList((list: ProjectExpType[]) => {
                const newList = list.filter((i) => item.id !== i.id);
                setUpdated(true);
                return cloneDeep(newList);
            });
        };

        let cellValue = item[columnKey as keyof ProjectExpType];
        switch (columnKey) {
          case "durationTime":
            const start = moment(item.durationTime[0]).format("YYYY-MM-DD");
            const end = moment(item.durationTime[1]).format("YYYY-MM-DD");
            return (
                <div>
                    <DateRangePicker 
                        visibleMonths={2}
                        value={{
                            start: parseDate(start),
                            end: parseDate(end),
                        }}
                        onChange={(data: any) => {
                            const start = data.start.toDate(getLocalTimeZone()).getTime();
                            const end = data.end.toDate(getLocalTimeZone()).getTime();
                            setProjectExpList((list: ProjectExpType[]) => {
                                const newList = cloneDeep(list);
                                newList[index] = {
                                    ...newList[index],
                                    [columnKey]: [start, end],
                                };
                                setUpdated(true);
                                return newList;
                            });
                        }}
                    />
                </div>
            );
          case "technology_stack":
            return (
                <ChipSelector
                chips={cellValue as string[]}
                setChips={handleChangeValue}
                setUpdated={setUpdated}
                size="sm"
                />
            );
          case "company_name":
            return (
                <Textarea
                isRequired
                className="max-w-xs"
                value={cellValue as string}
                onValueChange={handleChangeValue}
                />
            );
          case "details":
            return (
                <Textarea
                isRequired
                className="max-w-xs"
                value={cellValue as string}
                onValueChange={handleChangeValue}
                />
          );
          case "filePath":
            return (
                !cellValue ?
                    <div>
                        <Tooltip content={t('profile.upload')}>
                            <Button
                            color="primary"
                            className="text-md"
                            isIconOnly
                            variant="light"
                            size="md"
                            >
                                <label htmlFor={`file-${index}`} className="block text-sm font-semibold leading-6"><BsUpload className="text-xl" /></label>
                            </Button>
                        </Tooltip>
                        <input type="file" id={`file-${index}`} className="hidden" accept="image/*, video/*"  onChange={handleUploadFile} />
                    </div> :
                    <div>
                        <a href={cellValue as string} className="underline text-blue-500 hover:text-blue-700" target="_blank">{item.fileName}</a>
                        <Button
                        color="danger"
                        className="text-md"
                        isIconOnly
                        variant="light"
                        size="md"
                        onClick={() => {
                            setProjectExpList((list: ProjectExpType[]) => {
                                const newList = cloneDeep(list);
                                newList[index] = {
                                    ...newList[index],
                                    [columnKey as keyof ProjectExpType]: '',
                                };
                                setUpdated(true);
                                return newList;
                            });
                        }}
                        >
                            <BsFillXCircleFill className="text-xl" />
                        </Button>
                    </div>
          );
          case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content={t('profile.addItem')}>
                        <Button
                        color="primary"
                        className="text-md"
                        isIconOnly
                        variant="light"
                        size="md"
                        onClick={handleAddItem}
                        >
                            <BsPlus className="text-3xl" />
                        </Button>
                    </Tooltip>
                    <Tooltip content={t('profile.deleteItem')}>
                        <Button
                        color="danger"
                        className="text-md"
                        isIconOnly
                        variant="light"
                        size="md"
                        onClick={handleDeleteItem}
                        isDisabled={projectExpList.length === 1}
                        >
                            <BsDash className="text-2xl" />
                        </Button>
                    </Tooltip>
                </div>
            );
          default:
            return cellValue;
        }
      };

    useEffect(() => {
        async function init() {
            const result = await httpGet(`${window.location.origin}/api/projectexp?username=${userProfile?.username}`) as ProjectExpType[];
            if (result) {
                if (result.length > 0) {
                    const list = result.map(item => ({
                        ...item,
                        technology_stack: item.technology_stack ? (item.technology_stack as string)?.split(',') : [],
                    })).sort((a, b) => a.order - b.order);
                    setProjectExpList(list);
                    return;
                }
                setProjectExpList([initialItem]);
            }
        }
        init()
    }, []);

    async function updateintroduction() {
        const {
            id,
            username,
            sub,
        } = userProfile;
        const payload = projectExpList.map((item: ProjectExpType, index: number) => ({
            ...item,
            userid: id,
            username,
            usersub: sub,
            order: index + 1,
            technology_stack: (item.technology_stack as string[])?.join(),
        }));
        const result = await httpPost(`${window.location.origin}/api/projectexp`, payload)
        if (result) {
            setUpdated(false);
            window.enqueueSnackbar('Successfully updated', { variant: "success" } );
        }
    }

    return (
        <section className="py-8"  id="experience">
            <div className="flex ">
            <div className="leading-8 text-xl">{t('profile.projectExperience')}</div>
                <div className="flex-1"></div>
                <Tooltip content={t('profile.refresh')}>
                    <Button
                    color="primary"
                    className="text-md mr-2"
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() => {
                        init();
                        setUpdated(false);
                    }}
                    >
                        <AiOutlineReload className="text-xl" />
                    </Button>
                </Tooltip>
                <Button
                color="primary"
                className="text-md"
                size="sm"
                isDisabled={!isUpdated}
                onClick={updateintroduction}
                >
                    {t('profile.save')}
                </Button>
            </div>
            <Table aria-label="Example table with custom cells" className="mt-2.5">
                <TableHeader columns={columns}>
                    {(column: Column) => (
                    <TableColumn key={column.id} width={column.width as any}>
                        {column.name}
                    </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={projectExpList}>
                    {(item: ProjectExpType) => (
                    <TableRow key={item.order}>
                        {(columnKey: keyof Column) => <TableCell>{renderCell(item, columnKey, projectExpList.findIndex((i: ProjectExpType) => i.timestamp === item.timestamp))}</TableCell>}
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </section>
    );
};

export default ProjectExp;
