USE [master]
GO
/****** Object:  Database [bangten]    Script Date: 10/30/2024 3:34:39 PM ******/
CREATE DATABASE [bangten]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'bangten', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\bangten.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'bangten_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\bangten_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [bangten] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [bangten].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [bangten] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [bangten] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [bangten] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [bangten] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [bangten] SET ARITHABORT OFF 
GO
ALTER DATABASE [bangten] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [bangten] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [bangten] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [bangten] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [bangten] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [bangten] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [bangten] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [bangten] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [bangten] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [bangten] SET  ENABLE_BROKER 
GO
ALTER DATABASE [bangten] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [bangten] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [bangten] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [bangten] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [bangten] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [bangten] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [bangten] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [bangten] SET RECOVERY FULL 
GO
ALTER DATABASE [bangten] SET  MULTI_USER 
GO
ALTER DATABASE [bangten] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [bangten] SET DB_CHAINING OFF 
GO
ALTER DATABASE [bangten] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [bangten] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [bangten] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [bangten] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'bangten', N'ON'
GO
ALTER DATABASE [bangten] SET QUERY_STORE = ON
GO
ALTER DATABASE [bangten] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [bangten]
GO
/****** Object:  User [btdt]    Script Date: 10/30/2024 3:34:40 PM ******/
CREATE USER [btdt] FOR LOGIN [btdt] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[admin]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin](
	[id] [int] NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[phone] [int] NULL,
	[zalo] [int] NULL,
	[duty] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[btnfunction]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[btnfunction](
	[id] [int] NOT NULL,
	[name_func] [varchar](10) NOT NULL,
	[press] [int] NULL,
	[status] [int] NULL,
	[id_card] [int] NULL,
	[id_room] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[content]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[content](
	[id] [int] NOT NULL,
	[content] [nvarchar](200) NOT NULL,
	[selection_key] [int] NOT NULL,
	[id_room] [int] NOT NULL,
	[id_card] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[device]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[device](
	[id] [char](20) NOT NULL,
	[namedevice] [nvarchar](50) NOT NULL,
	[origin] [nvarchar](50) NOT NULL,
	[active] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[images]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[images](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[image_data] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[photo]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[photo](
	[photoID] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](255) NOT NULL,
	[filePath] [nvarchar](255) NULL,
	[sizeKB] [int] NULL,
	[format] [nvarchar](50) NULL,
	[createdAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[photoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[room]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[room](
	[id] [char](20) NOT NULL,
	[nameroom] [nvarchar](100) NULL,
	[idtemplate] [char](20) NULL,
	[idsize] [char](20) NULL,
	[datestart] [date] NULL,
	[width] [int] NULL,
	[height] [int] NULL,
	[room] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[size]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[size](
	[id] [char](20) NOT NULL,
	[namesize] [nvarchar](20) NOT NULL,
	[width] [int] NULL,
	[height] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tablecard]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tablecard](
	[id] [char](20) NOT NULL,
	[namecard] [nvarchar](50) NULL,
	[idtemplate] [char](20) NULL,
	[active] [int] NULL,
	[battery] [varchar](10) NULL,
	[idroom] [char](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_mappingtype_name]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_mappingtype_name](
	[id] [int] NOT NULL,
	[mappingType] [int] NOT NULL,
	[mappingName] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_styles]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_styles](
	[id] [int] NOT NULL,
	[name] [varchar](255) NULL,
	[type] [int] NULL,
	[width] [int] NULL,
	[height] [int] NULL,
	[descriptor] [varchar](255) NULL,
	[rotate] [int] NULL,
	[mappingtype] [int] NULL,
	[updatetime] [datetime] NULL,
	[userid] [int] NULL,
	[backgroundId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_tags]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_tags](
	[id] [int] NOT NULL,
	[mac] [bigint] NULL,
	[shopNumber] [int] NULL,
	[width] [int] NULL,
	[height] [int] NULL,
	[power] [int] NULL,
	[rssi] [int] NULL,
	[state] [binary](1) NULL,
	[goodid] [int] NULL,
	[styleid] [int] NULL,
	[routerid] [int] NULL,
	[name] [varchar](50) NULL,
	[serialNumber] [varchar](50) NULL,
	[hardwareVersion] [int] NULL,
	[softwareVersion] [int] NULL,
	[productionBatch] [varchar](20) NULL,
	[manufacture] [varchar](50) NULL,
	[updateProgress] [int] NULL,
	[screentype] [int] NULL,
	[wakeState] [int] NULL,
	[updatetime] [datetime] NULL,
	[refreshJsonData] [text] NULL,
	[ido] [varchar](50) NULL,
	[sub] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_tagsandgoods]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_tagsandgoods](
	[id] [int] NOT NULL,
	[goodid] [int] NOT NULL,
	[tagid] [int] NOT NULL,
	[price] [decimal](10, 2) NOT NULL,
	[barcode] [varchar](20) NOT NULL,
	[qrCode] [varchar](20) NOT NULL,
	[shopNumber] [varchar](20) NOT NULL,
	[photo] [varchar](255) NULL,
	[validity] [date] NULL,
	[status] [int] NOT NULL,
	[name] [varchar](100) NOT NULL,
	[origin] [varchar](100) NOT NULL,
	[provider] [varchar](100) NOT NULL,
	[operator] [varchar](50) NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[promotion] [int] NOT NULL,
	[promotionReason] [varchar](255) NULL,
	[promotePrice] [decimal](10, 2) NOT NULL,
	[waitUpdate] [int] NOT NULL,
	[unit] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[template]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[template](
	[id] [char](20) NOT NULL,
	[nametem] [nvarchar](100) NOT NULL,
	[idphoto] [char](20) NULL,
	[idsize] [char](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[u_user]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[u_user](
	[id] [int] NOT NULL,
	[username] [nvarchar](20) NOT NULL,
	[password] [nvarchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vote]    Script Date: 10/30/2024 3:34:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vote](
	[id] [int] NOT NULL,
	[id_room] [char](20) NULL,
	[id_card] [char](20) NULL,
	[meeting_content] [text] NULL,
	[vote] [int] NULL,
	[vote_date] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[photo] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[tablecard]  WITH CHECK ADD  CONSTRAINT [fk_tablecard_room] FOREIGN KEY([idroom])
REFERENCES [dbo].[room] ([id])
GO
ALTER TABLE [dbo].[tablecard] CHECK CONSTRAINT [fk_tablecard_room]
GO
USE [master]
GO
ALTER DATABASE [bangten] SET  READ_WRITE 
GO
