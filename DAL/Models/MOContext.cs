using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

#nullable disable

namespace DAL.Models
{
    /// <summary>
    /// Класс контекста базы данных
    /// </summary>
    public partial class MOContext : IdentityDbContext<Client>
    {
        public MOContext()
        {
        }

        public MOContext(DbContextOptions<MOContext> options)
            : base(options)
            
        {
        }

        public virtual DbSet<AddBalance> AddBalances { get; set; }
        public virtual DbSet<Call> Calls { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<ConnectService> ConnectServices { get; set; }
        public virtual DbSet<ConnectTariff> ConnectTariffs { get; set; }
        public virtual DbSet<ExtraService> ExtraServices { get; set; }
        public virtual DbSet<Sm> Sms { get; set; }
        public virtual DbSet<TariffPlan> TariffPlans { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-J29A61N;Initial Catalog=MO;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<AddBalance>(entity =>
            {
                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.AddBalances)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_AddBalance_Client");
            });

            modelBuilder.Entity<Call>(entity =>
            {
                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.Calls)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Call_Client");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.Property(e => e.Itn).IsFixedLength(true);

                entity.Property(e => e.Name).IsFixedLength(true);

                entity.Property(e => e.NumberPassport).IsFixedLength(true);

                entity.Property(e => e.Password).IsFixedLength(true);

                entity.Property(e => e.PhoneNumber).IsUnicode(false);

                entity.Property(e => e.SurName).IsFixedLength(true);
            });

            modelBuilder.Entity<ConnectService>(entity =>
            {
                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.ConnectServices)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ConnectService_Client");

                entity.HasOne(d => d.IdExtraServiceNavigation)
                    .WithMany(p => p.ConnectServices)
                    .HasForeignKey(d => d.IdExtraService)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ConnectService_ExtraService");
            });

            modelBuilder.Entity<ConnectTariff>(entity =>
            {
                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.ConnectTariffs)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ConnectTariff_Client");

                entity.HasOne(d => d.IdTariffPlanNavigation)
                    .WithMany(p => p.ConnectTariffs)
                    .HasForeignKey(d => d.IdTariffPlan)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ConnectTariff_TariffPlan");
            });

            modelBuilder.Entity<Sm>(entity =>
            {
                entity.HasOne(d => d.IdClientNavigation)
                    .WithMany(p => p.Sms)
                    .HasForeignKey(d => d.IdClient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Sms_Client");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
