using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.FileExtensions;
using Microsoft.Extensions.Configuration.Json;
using System.Linq;

namespace TravelAway.DataAccessLayer.Models
{
    public partial class TravelAwayDBContext : DbContext
    {
        public TravelAwayDBContext()
        {
        }

        public TravelAwayDBContext(DbContextOptions<TravelAwayDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accomodation> Accomodation { get; set; }
        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerCare> CustomerCare { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeLogin> EmployeeLogin { get; set; }
        public virtual DbSet<GenerateReport> GenerateReport { get; set; }
        public virtual DbSet<Hotels> Hotels { get; set; }
        public virtual DbSet<PackageCategories> PackageCategories { get; set; }
        public virtual DbSet<Packages> Packages { get; set; }
        public virtual DbSet<Payment> Payment { get; set; }
        public virtual DbSet<Rating> Rating { get; set; }
        public virtual DbSet<ReportCategory> ReportCategory { get; set; }
        public virtual DbSet<ReportMonth> ReportMonth { get; set; }
        public virtual DbSet<ReportPackageName> ReportPackageName { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<VehicleRent> VehicleRent { get; set; }
        public virtual DbSet<Vehicles> Vehicles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                       .SetBasePath(Directory.GetCurrentDirectory())
                       .AddJsonFile("appsettings.json");
            var config = builder.Build();
            var connectionString = config.GetConnectionString("TravelAwayDBConnectionString");

            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Accomodation>(entity =>
            {
                entity.ToTable("accomodation");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EmailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HotelName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HotelRating)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.RoomType)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Accomodation)
                    .HasForeignKey(d => d.BookingId)
                    .HasConstraintName("FK__accomodat__Booki__5629CD9C");

                entity.HasOne(d => d.Email)
                    .WithMany(p => p.Accomodation)
                    .HasForeignKey(d => d.EmailId)
                    .HasConstraintName("FK__accomodat__Email__571DF1D5");
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.Property(e => e.BookingStatus)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ContactNo).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.DateOfBooking).HasColumnType("date");

                entity.Property(e => e.DateOfTravel).HasColumnType("date");

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PackageId)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Place)
                    .IsRequired()
                    .HasColumnName("place")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ResidentialAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Package)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.PackageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Booking__Package__29572725");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.EmailId)
                    .HasName("pk_emailid");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ContactNumber).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength();

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CustomerCare>(entity =>
            {
                entity.HasKey(e => e.RequestId)
                    .HasName("pk_RequestId");

                entity.Property(e => e.CustQuery)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.QueryStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.CustomerCare)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomerC__Booki__4316F928");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EmployeeLogin>(entity =>
            {
                entity.HasKey(e => e.EmailId)
                    .HasName("pk_email");

                entity.Property(e => e.EmailId)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<GenerateReport>(entity =>
            {
                entity.Property(e => e.CategoryId)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.PackageId)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.GenerateReport)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__GenerateR__Categ__4BAC3F29");

                entity.HasOne(d => d.Package)
                    .WithMany(p => p.GenerateReport)
                    .HasForeignKey(d => d.PackageId)
                    .HasConstraintName("FK__GenerateR__Packa__4CA06362");
            });

            modelBuilder.Entity<Hotels>(entity =>
            {
                entity.HasKey(e => e.HotelId)
                    .HasName("PK__Hotels__46023BBF19F77249");

                entity.Property(e => e.HotelId).HasColumnName("HotelID");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.DeluxeRoomPrice).HasColumnType("money");

                entity.Property(e => e.DoubleRoomPrice).HasColumnType("money");

                entity.Property(e => e.HotelName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HotelRating)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.SingleRoomPrice).HasColumnType("money");

                entity.Property(e => e.SuitePrice).HasColumnType("money");
            });

            modelBuilder.Entity<PackageCategories>(entity =>
            {
                entity.HasKey(e => e.CategoryId)
                    .HasName("pk_CategoryId");

                entity.HasIndex(e => e.CategoryName)
                    .HasName("uq_CategoryName")
                    .IsUnique();

                entity.Property(e => e.CategoryId)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.VisitDays).HasColumnName("visitDays");
            });

            modelBuilder.Entity<Packages>(entity =>
            {
                entity.HasKey(e => e.PackageId)
                    .HasName("pk_PackageId");

                entity.Property(e => e.PackageId)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryId)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.PackageCategory)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PackageDesc)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.PackageName)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Packages)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Packages__Catego__267ABA7A");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("money");

                entity.Property(e => e.BookingStatus)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Payment)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Payment__Booking__45F365D3");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.Property(e => e.Comments)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReviewRating)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Rating__BookingI__52593CB8");
            });

            modelBuilder.Entity<ReportCategory>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.CategoryId)
                    .IsRequired()
                    .HasColumnName("categoryId")
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.NumbersOfPackages).HasColumnName("numbersOfPackages");
            });

            modelBuilder.Entity<ReportMonth>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.NumbersOfBooking).HasColumnName("numbersOfBooking");

                entity.Property(e => e.PackageId)
                    .IsRequired()
                    .HasColumnName("packageId")
                    .HasMaxLength(4)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ReportPackageName>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.NumbersOfBooking).HasColumnName("numbersOfBooking");

                entity.Property(e => e.PackageName)
                    .IsRequired()
                    .HasColumnName("packageName")
                    .HasMaxLength(40)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Roles>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("pk_RoleId");

                entity.ToTable("roles");

                entity.HasIndex(e => e.RoleName)
                    .HasName("uq_RoleName")
                    .IsUnique();

                entity.Property(e => e.RoleId).ValueGeneratedOnAdd();

                entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<VehicleRent>(entity =>
            {
                entity.Property(e => e.BookingDate)
                    .HasColumnName("Booking_Date")
                    .HasColumnType("date");

                entity.Property(e => e.Cost).HasColumnType("money");

                entity.Property(e => e.VehicleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VehicleType)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Booking)
                    .WithMany(p => p.VehicleRent)
                    .HasForeignKey(d => d.BookingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__VehicleRe__Booki__3B75D760");
            });

            modelBuilder.Entity<Vehicles>(entity =>
            {
                entity.HasKey(e => e.VehicleId)
                    .HasName("PK__Vehicles__1220EF98EFCBD5F5");

                entity.Property(e => e.VehicleId).HasColumnName("Vehicle ID");

                entity.Property(e => e.RatePerHour)
                    .HasColumnName("Rate Per Hour")
                    .HasColumnType("money");

                entity.Property(e => e.RatePerKm)
                    .HasColumnName("Rate per Km")
                    .HasColumnType("money");

                entity.Property(e => e.VehicleName)
                    .IsRequired()
                    .HasColumnName("Vehicle Name")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VehicleType)
                    .IsRequired()
                    .HasColumnName("Vehicle Type")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
