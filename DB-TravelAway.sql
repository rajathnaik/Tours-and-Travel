create database TravelAwayDB
USE TravelAwayDB
---------------User
create table Roles(
[RoleId] TINYINT CONSTRAINT pk_RoleId PRIMARY KEY IDENTITY,
[RoleName] VARCHAR(20) CONSTRAINT uq_RoleName UNIQUE
);

SET IDENTITY_INSERT Roles ON
INSERT INTO Roles(RoleId,RoleName) VALUES (1,'Customer')
INSERT INTO Roles(RoleId,RoleName) VALUES (2,'Employee')
SET IDENTITY_INSERT Roles OFF





CREATE TABLE Customer(
[EmailId] VARCHAR(50) CONSTRAINT pk_EmailId PRIMARY KEY,
[RoleId] TINYINT CONSTRAINT fk_RoleId REFERENCES Roles(RoleId),
[FirstName] VARCHAR(50) CONSTRAINT chk_FirstName CHECK(NOT [FirstName] LIKE '% %') NOT NULL,
[LastName] VARCHAR(50) CONSTRAINT chk_LastName CHECK(NOT [LastName] LIKE '% %') NOT NULL,
[UserPassword] VARCHAR(15) CONSTRAINT chk_UserPassword CHECK(len([UserPassword])>=8 AND len([UserPassword])<=16) NOT NULL,
[Gender] CHAR CONSTRAINT chk_Gender CHECK(Gender='F' OR Gender='M') NOT NULL,
[ContactNumber] NUMERIC(10) CONSTRAINT chk_ContactNumber check([ContactNumber] NOT LIKE '0%' AND len([ContactNumber])=10) NOT NULL, --SQUARE BRACES
[DateOfBirth] DATE CONSTRAINT chk_DateOfBirth CHECK(DateOfBirth<GETDATE()) NOT NULL,
[Address] VARCHAR(250) NOT NULL
);

INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('nandini@gmail.com','nandini@24',1,'F','Nandini','Malviya',8465713549,'1996-12-04','Indore');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('shubhangi@gmail.com','nandini@24',1,'F','Shubhangi','Agarwal',2457984315,'1999-05-22','UP');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('palak@gmail.com','nandini@24',1,'F','Palak','Singhal',4587921568,'1997-10-26','Kota');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('akash@gmail.com','nandini@24',1,'M','Pradhumn','Agrawal',3654789125,'1998-08-17','Bhopal');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('harsh@gmail.com','nandini@24',1,'M','Harsh','Raina',4587921568,'1997-10-26','Jammu');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('devansh@gmail.com','nandini@24',1,'M','Devansh','Sachdeva',3654789125,'1998-08-17','Delhi');




--------Package Category
CREATE TABLE PackageCategory(
[PackageCategoryId] INT CONSTRAINT pk_PackageCategoryId PRIMARY KEY IDENTITY(100,1),
[PackageCategoryName] VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO PackageCategory(PackageCategoryName)VALUES('Adventure'),('Nature'),('Luxury'),('Trekking'),('Hills'),('Wildlife'),('Beaches')

---------Package
CREATE TABLE Package(
[PackageId] INT CONSTRAINT pk_PackageId PRIMARY KEY IDENTITY(2000,1),
[PackageName] VARCHAR(30) UNIQUE NOT NULL,
[PackageCategoryId] INT CONSTRAINT fk_PackageCategoryId REFERENCES PackageCategory(PackageCategoryId),
[TypeOfPackage] VARCHAR(15) CONSTRAINT chk_TypeOfPackage CHECK(TypeOfPackage IN ('International','Domestic'))
);

SET IDENTITY_INSERT Package OFF
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('North India',100,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Dubai',101,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('America',102,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Australia',103,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Maldives',104,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Kasol-Manali',100,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Beauty of South',101,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Himachal',102,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Kerala',100,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Goa',100,'Domestic')
-------------------------Hotel
CREATE TABLE Hotel(
[HotelId] INT CONSTRAINT pk_HotelId PRIMARY KEY IDENTITY(1000,1),
[HotelName] VARCHAR(20),
[HotelRating] INT NOT NULL CONSTRAINT chk_HotelRating CHECK(HotelRating>=2 AND HotelRating<=5),
[SingleRoomPrice] MONEY,
[DoubleRoomPrice] MONEY,
[DeluxeeRoomPrice] MONEY,
[SuiteRoomPrice] MONEY,
[City] VARCHAR(20)
);

ALTER TABLE Hotel ADD [PackageId] INT CONSTRAINT fk_packId_hotels REFERENCES Package(PackageId)

--Search for packageId then insert this
SET IDENTITY_INSERT Hotel ON
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1001,'Four Seasons',4, 700,1400,2100,5000,'Dubai',2000)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1002,'Grand Hotel',3, 2800,4000,8800,10000,'America',2001)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1003,'Hotel Park View',4,3200,5500,7800,10000,'Australia',2002)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1004,'Arena Beach Hotel',3, 1400,2900,4800,7000,'Maldives',2003)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1005,'The Hillside',3, 1400,2900,4800,7000,'Kasol-Manali',2004)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1006,'Hyatt Regency',3, 1400,2900,4800,7500,'Kerala',2005)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1007,'Hotel Palm Tree',3, 1400,2900,4800,8000,'Uttarakhand',2006)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1008,'Taj Holiday Resort',4,3200,5500,7800,10000,'Heart Of India',2007)
INSERT INTO Hotel(HotelId,HotelName,HotelRating,SingleRoomPrice,DoubleRoomPrice,DeluxeeRoomPrice,SuiteRoomPrice,City,PackageId) VALUES(1009,'Grand Hyatt',4,3200,5500,7800,10500,'Goa',2008)

CREATE TABLE PackageDetails(
[PackageDetailsId] INT CONSTRAINT pk_PaclageDetailsId PRIMARY KEY IDENTITY(900,1),
[PackageId] INT CONSTRAINT fk_PackageId REFERENCES Package(PackageId),
[PlcesToVisit] VARCHAR(500) NOT NULL,
[Description] VARCHAR(500) NOT NULL,
[NoOfDays] INT NOT NULL,
[NoOfNights] INT NOT NULL,
[Accomodation] VARCHAR(10) CONSTRAINT chk_Accomodation CHECK(Accomodation IN ('Available','Unavailable')),
[PricePerAdult] DECIMAL
);
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2000,'Dubai','Great Place!',2,2,'Available',1000)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2001,'America','America never sleeps',5,4,'Available',9500)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2002,'Australia','Explore the beauty',4,4,'Available',8500)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2003,'Maldives','Love beaches? Check this out!!',4,3,'Available',9000)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2004,'Kasol-Manali','Best for trips with friends!',4,3,'Available',900)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2005,'Kanyakumari-Kerela','Heritage of India',4,4,'Available',1500)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2006,'Dehradun-Rishikesh','Religious-Family Place!',3,2,'Available',800)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2007,'Delhi','Great Place!',2,2,'Available',2000)
INSERT INTO PackageDetails(PackageId,PlcesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2008,'Goa','Great Place!',3,2,'Available',1200)

--------Book Package
CREATE TABLE BookPackage(
[EmailId] VARCHAR(50) CONSTRAINT fk_EmailId REFERENCES Customer(EmailId),
[BookingId] INT CONSTRAINT pk_BookingId PRIMARY KEY IDENTITY(4000,1),
[ContactNumber] NUMERIC(10) UNIQUE NOT NULL CONSTRAINT chk_ContactN CHECK(ContactNumber>999999999 AND ContactNumber<=9999999999),
[Address] VARCHAR(100) NOT NULL,
[DateOfTravel] DATE NOT NULL CONSTRAINT chk_DateOfTravel CHECK(DateOfTravel>=GETDATE()),
[NumberOfAdults] INT NOT NULL,
[NumberOfChildren] INT,
[Status] VARCHAR(10) NOT NULL
);
-----Added PackageId to BookPackage
ALTER TABLE BookPackage ADD [PackageId] INT CONSTRAINT fk_packId REFERENCES Package(PackageId)
--drop table BookPackage
--UPDATE BookPackage SET PackageId=2005 where BookingId=4005
---STATUS ??
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Nandini@gmail.com',5489674215,'310-Indore','2022-12-20',2,0,'Booked',2000)
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Palak@gmail.com',5479125642,'253-Delhi','2022-04-12',3,0,'Booked',2001)
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Shubhangi@gmail.com',9874565784,'310-Agra','2022-05-09',2,1,'Booked',2005)
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Akash@gmail.com',2457984315,'310-pune','2022-09-07',2,0,'Booked',2005)



CREATE TABLE Accomodation(
[AccomodationId] INT CONSTRAINT pk_AccomodationId PRIMARY KEY IDENTITY(1,1),
[BookingId] INT CONSTRAINT fk_BookingId REFERENCES BookPackage(BookingId),
[HotelName] VARCHAR(20),
[City] VARCHAR(30),
[NoOfRooms] INT NOT NULL,
[HotelRating] INT CONSTRAINT chk_HotelR CHECK(HotelRating>=1 and HotelRating<=5),
[Price] MONEY,
[RoomType] VARCHAR(20) CONSTRAINT chk_RoomType CHECK(RoomType='Single' OR RoomType='Double' OR RoomType='Deluxe' OR RoomType='Suite') NOT NULL
);

INSERT INTO Accomodation(BookingId,HotelName,City,NoOfRooms,HotelRating,Price,RoomType) VALUES(4000,'Arena Beach Hotel','Maldives',2,4,10000,'Deluxe')
INSERT INTO Accomodation(BookingId,HotelName,City,NoOfRooms,HotelRating,Price,RoomType) VALUES(4001,'Four Seasons','Dubai',1,5,15000,'Suite')

CREATE TABLE Rating(
[RatingId] INT CONSTRAINT pk_RatingId PRIMARY KEY IDENTITY(1,1),
[Comments] VARCHAR(200),
[Rating] INT CONSTRAINT chk_Rating CHECK(Rating>0 AND Rating<=5),
[BookingId] INT CONSTRAINT fk_BookId REFERENCES BookPackage(BookingId)
);



CREATE TABLE Vehicle(
[VehicleId] INT CONSTRAINT pk_VehicleId PRIMARY KEY IDENTITY(5000,1),
[VehicleName] VARCHAR(20) NOT NULL,
[VehicleType] VARCHAR(20) CONSTRAINT chk_Vehicle CHECK(VehicleType='Two-Wheeler' OR VehicleType='Four-Wheeler' OR VehicleType='Mini-Bus'),
[RatePerHour] DECIMAL(20,2) NOT NULL,
[RatePerKm] DECIMAL(20,2) NOT NULL,
[BasePrice] DECIMAL(20,2) NOT NULL
);

INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('City','Four-Wheeler',7,9,200)
INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('Honda-City','Four-Wheeler',15,20,1000)
INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('Shine','Two-Wheeler',7,9,350)
INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('Etios Cross','Four-Wheeler',20,9,500)
INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('Alto 800','Four-Wheeler',15,9,450)
INSERT INTO Vehicle(VehicleName,VehicleType,RatePerHour,RatePerKm,BasePrice) VALUES('Suzuki-1200','Mini-Bus',20,15,800)


CREATE TABLE VehicleBooked(
[VehicleBookingId] INT CONSTRAINT pk_VehicleBookingId PRIMARY KEY IDENTITY,
[VehicleId] INT CONSTRAINT fk_VehicleId REFERENCES Vehicle(VehicleId),
[VehicleName] VARCHAR(20) NOT NULL,
[BookingDate] DATE CONSTRAINT chk_BookingDate CHECK(BookingDate>=GETDATE()) NOT NULL,
[PickupTime] VARCHAR(20) NOT NULL,
[NoOfHours] INT CONSTRAINT chk_NoOfHours CHECK([NoOfHours]>=3) NOT NULL,
[NoOfKms] INT NOT NULL,
[TotalCost] DECIMAL(20,2) NOT NULL,
[VehicleStatus] VARCHAR(30) CONSTRAINT chk_status CHECK (VehicleStatus='Booked' OR VehicleStatus='Active' OR VehicleStatus='Closed')
)

CREATE TABLE Employee(
[EmpId] INT CONSTRAINT pk_EMPID PRIMARY KEY IDENTITY,
[FirstName] VARCHAR(50) CONSTRAINT chk_FName CHECK(NOT[FirstName] LIKE '% %') NOT NULL,
[LastName] VARCHAR(50) CONSTRAINT chk_LName CHECK(NOT[LastName] LIKE '% %') NOT NULL,
[Password] VARCHAR(15) CONSTRAINT chk_Password CHECK(len([Password])>=8 AND LEN ([Password])<=16) NOT NULL,
[RoleId] TINYINT CONSTRAINT fk_RId REFERENCES Roles(RoleId),
[EmailId] VARCHAR(50)
)

INSERT INTO Employee(FirstName,LastName,[Password],RoleId,EmailId) VALUES('Nandini','Malviya','nandini@24',2,'nandini@gmail.com')
INSERT INTO Employee(FirstName,LastName,[Password],RoleId,EmailId) VALUES('Palak','Singhal','nandini@24',2,'palak@gmail.com')



CREATE TABLE CustomerCare(
[QueryId] INT CONSTRAINT pk_QueryId PRIMARY KEY IDENTITY,
[BookingId] INT CONSTRAINT fk_BId REFERENCES BookPackage(BookingId),
[Query] VARCHAR(100),
[QueryStatus] VARCHAR(30) CONSTRAINT chk_QueryStatus CHECK(QueryStatus='Assigned' OR QueryStatus='In Progress' OR QueryStatus='Closed'),
[Assignee] VARCHAR(50),
[QueryAnswer] VARCHAR(200)
)

CREATE TABLE Payment(
[PaymentId] INT CONSTRAINT pk_PaymentId PRIMARY KEY IDENTITY,
[BookingId] INT CONSTRAINT fk_PaymentBookId REFERENCES BookPackage(BookingId),
[TotalAmount] MONEY,
[PaymentStatus] VARCHAR(20) CONSTRAINT chk_PaymentStatus CHECK (PaymentStatus='Confirmed' OR PaymentStatus='Not Confirmed')
);

INSERT INTO Payment(BookingId,TotalAmount,PaymentStatus) VALUES (4000,2000000,'Confirmed')


-----------------------------------------STORED PROCEDURE-------------------------

CREATE PROCEDURE usp_RegisterCustomer
(
@EmailId VARCHAR(30),
@FirstName VARCHAR(20),
@LastName VARCHAR(20),
@Password VARCHAR(16),
@Gender CHAR,
@Contact NUMERIC(10),
@DOB DATE,
@Address VARCHAR(50)
)
AS BEGIN
	DECLARE @RoleId CHAR(2),
		@retval INT
	BEGIN TRY
		IF(LEN(@EmailId)<4 OR LEN(@EmailId) IS NULL OR @EmailId NOT LIKE ('_%@_%.com'))
		SET @retval=-1
		ELSE IF(LEN(@Password)<8 OR LEN(@Password)>16 OR (@Password IS NULL))
		SET @retval=-2
		ELSE IF(@DOB>=CAST(GETDATE() AS DATE) OR (@DOB IS NULL))
		SET @retval=-3
		ELSE IF (DATEDIFF(day,@DOB,GETDATE())<6570)
		SET @retval=-4
		ELSE IF(@FirstName LIKE('%[^a-zA-Z]%') OR LEN(@FirstName)=0)
		SET @retval=-5
		ELSE IF(@LastName LIKE ('%[^a-zA-Z]%') OR LEN(@LastName)=0)
		SET @retval=-5
		ELSE
			BEGIN
				SELECT @RoleId=RoleId FROM dbo.Roles WHERE RoleName='Customer'
				INSERT INTO dbo.Customer VALUES
				(@EmailId,@RoleId,@FirstName,@LastName,@Password,@Gender,@Contact,@DOB,@Address)
				SET @retval=1
			END
		SELECT @retval
	END TRY
	BEGIN CATCH
		SET @retval=-99
		SELECT @retval, ERROR_LINE(),ERROR_MESSAGE()
	END CATCH
END 

DECLARE @ReturnResult INT
EXEC usp_RegisterCustomer 'xyz@gmail.com','Joey','Tribianni','FOOD@1234','M',8976450023,'1998-03-10','234 London'
SELECT @ReturnResult as ReturnResult

CREATE FUNCTION ufn_ViewAllPackages()
RETURNS TABLE
AS
	RETURN (SELECT P.PackageId,P.PackageCategoryId,P.PackageName,P.TypeOfPackage, Description 
	FROM Package P JOIN PackageDetails PD ON P.PackageId=PD.PackageId)

SELECT *FROM ufn_ViewAllPackages()

CREATE FUNCTION ufn_ViewPackageCategory(@PackageCategoryName VARCHAR(20))
RETURNS TABLE
AS 
RETURN
	(SELECT P.PackageName,Description FROM Package P JOIN PackageDetails PD ON P.PackageId=PD.PackageID 
	WHERE P.PackageCategoryId IN (SELECT PackageCategoryId FROM PackageCategory WHERE PackageCategoryName=@PackageCategoryName))



CREATE PROCEDURE [usp_AddAccommodation]
(
@BookingId INT,
@City VARCHAR(20),
@HotelRating INT,
@Hotels VARCHAR(30),
@RoomType VARCHAR(20),
@NoOfRooms INT,
@EstimatedCost NUMERIC
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT BookingId FROM BookPackage WHERE BookingId=@BookingId)
		BEGIN
			RETURN -1;
		END
		ELSE IF NOT EXISTS (SELECT HotelName FROM Hotel WHERE HotelName=@Hotels)
		BEGIN
			RETURN -2;
		END
		ELSE
		BEGIN
			INSERT INTO Accomodation(BookingId,City,HotelRating,HotelName,RoomType,NoOfRooms,Price)
			VALUES(@BookingId,@City,@HotelRating,@Hotels,@RoomType,@NoOfRooms,@EstimatedCost)
			RETURN 1;
		END
	END TRY

	BEGIN CATCH
		RETURN -99
	END CATCH
END

DECLARE @ReturnVal INT
EXEC @ReturnVal = usp_AddAccommodation 4000,'Pune',3,'Ashok','Single',1,1000
SELECT @ReturnVal AS ReturnVal






CREATE FUNCTION ufn_GetAccommodationByBookingId(@BookingId INT)
RETURNS TABLE
AS
RETURN (SELECT * FROM Accomodation WHERE BookingId=@BookingId)




CREATE PROCEDURE usp_bookingCost(@BookingId INT)    
AS
BEGIN
	DECLARE @COST DECIMAL
	SET @COST=(SELECT ((pd.PricePerAdult*(pd.NoOfDays+pd.NoOfNights))+(pd.PricePerAdult*bp.NumberOfAdults)+(pd.PricePerAdult*bp.NumberOfChildren/2))
    FROM PackageDetails pd JOIN BookPackage bp on pd.PackageId = bp.PackageId WHERE bp.BookingId = @BookingId)
	RETURN @COST
END

DECLARE @ret DECIMAL
EXEC @ret = dbo.usp_bookingCost 4001
select @ret


CREATE FUNCTION ufn_GetBookings(@EmailId VARCHAR(50))
RETURNS TABLE
AS
RETURN (SELECT bp.BookingId, bp.EmailId, p.PackageName, p.TypeOfPackage, bp.DateOfTravel,bp.NumberOfAdults, bp.NumberOfChildren
FROM Package p JOIN BookPackage bp ON p.PackageId = bp.PackageId WHERE bp.EmailId = @EmailId)

SELECT * FROM ufn_GetBookings('Nandini@gmail.com')







CREATE FUNCTION ufn_GetReportByPackageName()
RETURNS TABLE 
AS
RETURN (SELECT p.PackageName AS PackageName, COUNT(p.PackageName) AS Bookings FROM Package p
INNER JOIN BookPackage b ON b.PackageId=p.PackageId GROUP BY PackageName)

SELECT * FROM ufn_GetReportByPackageName()





CREATE FUNCTION ufn_GetReportByPackageCategoryName()
RETURNS TABLE
AS
RETURN(SELECT pc.PackageCategoryName, COUNT(p.PackageCategoryId) AS AvailablePackage FROM PackageCategory pc
INNER JOIN Package p on p.PackageCategoryId=pc.PackageCategoryId GROUP BY pc.PackageCategoryName)

SELECT * FROM ufn_GetReportByPackageCategoryName()






CREATE FUNCTION ufn_GetReportByMonth(@month INT)
RETURNS TABLE 
AS
RETURN(
SELECT pd.PackageDetailsId,COUNT(b.PackageId) AS NumberOfBookings
FROM PackageDetails pd INNER JOIN BookPackage b ON
pd.PackageId=b.PackageId WHERE MONTH(b.DateOfTravel)=@month
GROUP BY pd.PackageDetailsId
)

SELECT * FROM ufn_GetReportByMonth(3)






CREATE PROCEDURE usp_AddAnswer
(
@QueryId INT, @QueryStatus VARCHAR(30), @Answer VARCHAR(100)
)
AS 
BEGIN
BEGIN TRY
IF(@QueryId IS NULL)
RETURN -1
IF(@QueryStatus IS NULL)
RETURN -2
IF(@Answer IS NULL)
RETURN -3
ELSE
BEGIN
UPDATE CustomerCare SET QueryStatus=@QueryStatus, QueryAnswer=@Answer
WHERE QueryId=@QueryId 
RETURN 1
END
END TRY
BEGIN CATCH
RETURN -98
END CATCH
END

-----Execute statement missing



CREATE PROCEDURE usp_CloseQuery
(
@QueryId INT,@QueryStatus VARCHAR(30)
)
AS
BEGIN
BEGIN TRY
IF(@QueryId IS NULL)
RETURN -1
IF(@QueryStatus IS NULL)
RETURN -2
ELSE
BEGIN
UPDATE CustomerCare SET QueryStatus=@QueryStatus
WHERE QueryId=@QueryId
RETURN 1
END
END TRY
BEGIN CATCH
RETURN -99
END CATCH
END

create procedure [usp_AddRating]
(
  @BookingId int,
  @Rating decimal(2,1),
  @Comment varchar(100)
)
As
Begin 
      BEGIN TRY
              IF NOT EXISTS(SELECT BookingId FROM Booking where BookingId=@BookingId)
              begin
              return -1;
              end

              ELSE
              BEGIN
                    INSERT INTO Ratings(BookingId,rating,comments) values(@BookingId,@Rating,@Comment)
                    RETURN -1;

              END
    END TRY
    BEGIN CATCH
           RETURN -99
    END CATCH
END

create procedure [usp_AddAccomodation]
(
  @BookingId int,
  @City varchar(20),
  @HotelRating int,
  @HotelName varchar(30),
  @RoomType varchar(20),
  @NoOfRooms int,
  @EstimatedCost numeric
)
AS
BEGIN
     BEGIN TRY
             IF NOT EXISTS(SELECT BookingId FROM Booking where BookingId=@BookingId)
             BEGIN
             RETURN -1;
             END
             ELSE IF NOT EXISTS(SELECT HotelName from Hotel where HotelName=@HotelName)
             begin
             return -2;
             end
             else
             begin
                 insert into Accomodation(BookingId,City,HotelName,NoOfRooms,HotelRating,Price,RoomType)
                 values(@BookingId,@City,@HotelName,@NoOfRooms,@HotelRating,@EstimatedCost,@RoomType)
                 return 1;
             end
        end try

    begin catch
         return -99
    end catch
end

create procedure [dbo].[usp_CustomerCare]
(
   @QueryStatus varchar(20),
   @Assignee  varchar(20),
   @QueryAnswer varchar(200),
   @BookingId int

)
AS
BEGIN
BEGIN TRY
DECLARE @ReturnResult INT
INSERT INTO[CustomerCare](QueryStatus,Assignee,QueryAnswer,BookingId)
VALUES(@QueryStatus,@Assignee,@QueryAnswer,@BookingId)
SET @ReturnResult=1
RETURN @ReturnResult
END TRY
BEGIN CATCH
SET @ReturnResult=-99
RETURN @ReturnResult
END CATCH
END

CREATE PROCEDURE [dbo].[usp_Booking]
(
@SubPAckage int,
@EmailId varchar(50),
@Number Numeric(10),
@Address varchar(200),
@BookingStatus varchar(50),
@DateOfTravel DATE,
@NoOfAdults int,
@NoOfChildren int
)
AS
BEGIN
BEGIN TRY
     INSERT INTO[Booking](SubPAckage,EmailId,ContactNumber,ResidentialAddress,BookingStatus,DateOfTravel,NoOfAdults,NoOfChildren)
     values(@SubPAckage,@EmailId,@Number,@Address,@BookingStatus,@DateOfTravel,@NoOfAdults,@NoOfChildren)
     RETURN 1
 END TRY
 BEGIN CATCH
   RETURN -1
END catch
end




