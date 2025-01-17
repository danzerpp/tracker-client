namespace TrackerSimulator
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            lat = new TextBox();
            label1 = new Label();
            label2 = new Label();
            lon = new TextBox();
            label3 = new Label();
            label4 = new Label();
            label5 = new Label();
            tempMinDelayed = new TextBox();
            label6 = new Label();
            label7 = new Label();
            tempMaxDelayed = new TextBox();
            dateStartDelayed = new DateTimePicker();
            label9 = new Label();
            tabControl1 = new TabControl();
            tabPage1 = new TabPage();
            label11 = new Label();
            dateOnePoint = new DateTimePicker();
            btnOnePoint = new Button();
            label10 = new Label();
            tempOnePoint = new TextBox();
            tabPage2 = new TabPage();
            label18 = new Label();
            speedDelay = new TextBox();
            txtTimeDelayedSimulation = new TextBox();
            label8 = new Label();
            btnDelayedSimulation = new Button();
            tabPage3 = new TabPage();
            label19 = new Label();
            speedNow = new TextBox();
            loopCountNow = new TextBox();
            label17 = new Label();
            label12 = new Label();
            timeNow = new TextBox();
            dateNow = new DateTimePicker();
            label13 = new Label();
            btnSimualtionNow = new Button();
            label14 = new Label();
            tempMinNow = new TextBox();
            label15 = new Label();
            label16 = new Label();
            tempMaxNow = new TextBox();
            lblSimulationCount = new Label();
            label20 = new Label();
            txtUrl = new TextBox();
            label21 = new Label();
            txtTrackerId = new TextBox();
            label22 = new Label();
            txtAnimalId = new TextBox();
            tabControl1.SuspendLayout();
            tabPage1.SuspendLayout();
            tabPage2.SuspendLayout();
            tabPage3.SuspendLayout();
            SuspendLayout();
            // 
            // lat
            // 
            lat.Font = new Font("Segoe UI", 12F);
            lat.Location = new Point(191, 214);
            lat.Name = "lat";
            lat.Size = new Size(186, 34);
            lat.TabIndex = 0;
            lat.Text = "52.2297";
            lat.TextChanged += lat_TextChanged;
            lat.KeyPress += lat_KeyPress;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label1.Location = new Point(191, 183);
            label1.Name = "label1";
            label1.Size = new Size(186, 28);
            label1.TabIndex = 1;
            label1.Text = "Latitude - szerokość";
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label2.Location = new Point(399, 183);
            label2.Name = "label2";
            label2.Size = new Size(188, 28);
            label2.TabIndex = 3;
            label2.Text = "Longitude - długość";
            // 
            // lon
            // 
            lon.Font = new Font("Segoe UI", 12F);
            lon.Location = new Point(399, 214);
            lon.Name = "lon";
            lon.Size = new Size(186, 34);
            lon.TabIndex = 2;
            lon.Text = "21.0122";
            lon.TextChanged += long_TextChanged;
            lon.KeyPress += lat_KeyPress;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 238);
            label3.Location = new Point(191, 145);
            label3.Name = "label3";
            label3.Size = new Size(348, 38);
            label3.TabIndex = 4;
            label3.Text = "Punkt startowy symulacji";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label4.Location = new Point(383, 213);
            label4.Name = "label4";
            label4.Size = new Size(16, 28);
            label4.TabIndex = 5;
            label4.Text = ",";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label5.Location = new Point(124, 76);
            label5.Name = "label5";
            label5.Size = new Size(102, 28);
            label5.TabIndex = 7;
            label5.Text = "Temp MIN";
            // 
            // tempMinDelayed
            // 
            tempMinDelayed.Font = new Font("Segoe UI", 12F);
            tempMinDelayed.Location = new Point(124, 107);
            tempMinDelayed.Name = "tempMinDelayed";
            tempMinDelayed.Size = new Size(186, 34);
            tempMinDelayed.TabIndex = 6;
            tempMinDelayed.Text = "32";
            tempMinDelayed.TextChanged += temp_TextChanged;
            tempMinDelayed.KeyPress += temp_KeyPress;
            // 
            // label6
            // 
            label6.AutoSize = true;
            label6.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label6.Location = new Point(124, 38);
            label6.Name = "label6";
            label6.Size = new Size(431, 29);
            label6.TabIndex = 8;
            label6.Text = "Temperatury - przedział w symulacji";
            // 
            // label7
            // 
            label7.AutoSize = true;
            label7.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label7.Location = new Point(334, 76);
            label7.Name = "label7";
            label7.Size = new Size(107, 28);
            label7.TabIndex = 10;
            label7.Text = "Temp MAX";
            // 
            // tempMaxDelayed
            // 
            tempMaxDelayed.Font = new Font("Segoe UI", 12F);
            tempMaxDelayed.Location = new Point(334, 107);
            tempMaxDelayed.Name = "tempMaxDelayed";
            tempMaxDelayed.Size = new Size(186, 34);
            tempMaxDelayed.TabIndex = 9;
            tempMaxDelayed.Text = "36";
            tempMaxDelayed.TextChanged += temp_TextChanged;
            tempMaxDelayed.KeyPress += temp_KeyPress;
            // 
            // dateStartDelayed
            // 
            dateStartDelayed.CustomFormat = "dd.MM.yyyy hh:mm:ss";
            dateStartDelayed.Font = new Font("Segoe UI", 12F);
            dateStartDelayed.Format = DateTimePickerFormat.Custom;
            dateStartDelayed.Location = new Point(124, 191);
            dateStartDelayed.Name = "dateStartDelayed";
            dateStartDelayed.Size = new Size(396, 34);
            dateStartDelayed.TabIndex = 11;
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Font = new Font("Segoe UI", 13.8F, FontStyle.Bold, GraphicsUnit.Point, 238);
            label9.Location = new Point(124, 157);
            label9.Name = "label9";
            label9.Size = new Size(241, 31);
            label9.TabIndex = 13;
            label9.Text = "Data startu symulacji";
            // 
            // tabControl1
            // 
            tabControl1.Controls.Add(tabPage1);
            tabControl1.Controls.Add(tabPage2);
            tabControl1.Controls.Add(tabPage3);
            tabControl1.Location = new Point(63, 256);
            tabControl1.Name = "tabControl1";
            tabControl1.SelectedIndex = 0;
            tabControl1.Size = new Size(656, 550);
            tabControl1.TabIndex = 16;
            // 
            // tabPage1
            // 
            tabPage1.Controls.Add(label11);
            tabPage1.Controls.Add(dateOnePoint);
            tabPage1.Controls.Add(btnOnePoint);
            tabPage1.Controls.Add(label10);
            tabPage1.Controls.Add(tempOnePoint);
            tabPage1.Location = new Point(4, 29);
            tabPage1.Name = "tabPage1";
            tabPage1.Padding = new Padding(3);
            tabPage1.Size = new Size(648, 517);
            tabPage1.TabIndex = 0;
            tabPage1.Text = "Pojedynczy punkt";
            tabPage1.UseVisualStyleBackColor = true;
            // 
            // label11
            // 
            label11.AutoSize = true;
            label11.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label11.Location = new Point(171, 44);
            label11.Name = "label11";
            label11.Size = new Size(161, 29);
            label11.TabIndex = 20;
            label11.Text = "Data odczytu";
            // 
            // dateOnePoint
            // 
            dateOnePoint.CustomFormat = "dd.MM.yyyy hh:mm:ss";
            dateOnePoint.Font = new Font("Segoe UI", 12F);
            dateOnePoint.Format = DateTimePickerFormat.Custom;
            dateOnePoint.Location = new Point(171, 88);
            dateOnePoint.Name = "dateOnePoint";
            dateOnePoint.Size = new Size(293, 34);
            dateOnePoint.TabIndex = 19;
            // 
            // btnOnePoint
            // 
            btnOnePoint.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 238);
            btnOnePoint.Location = new Point(171, 226);
            btnOnePoint.Name = "btnOnePoint";
            btnOnePoint.Size = new Size(293, 49);
            btnOnePoint.TabIndex = 18;
            btnOnePoint.Text = "Wyślij punkt";
            btnOnePoint.UseVisualStyleBackColor = true;
            btnOnePoint.Click += btnOnePoint_Click;
            // 
            // label10
            // 
            label10.AutoSize = true;
            label10.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label10.Location = new Point(171, 139);
            label10.Name = "label10";
            label10.Size = new Size(293, 29);
            label10.TabIndex = 17;
            label10.Text = "Temperatura zwierzęcia";
            // 
            // tempOnePoint
            // 
            tempOnePoint.Font = new Font("Segoe UI", 12F);
            tempOnePoint.Location = new Point(171, 171);
            tempOnePoint.Name = "tempOnePoint";
            tempOnePoint.Size = new Size(293, 34);
            tempOnePoint.TabIndex = 16;
            tempOnePoint.TextChanged += temp_TextChanged;
            tempOnePoint.KeyPress += temp_KeyPress;
            // 
            // tabPage2
            // 
            tabPage2.Controls.Add(label18);
            tabPage2.Controls.Add(speedDelay);
            tabPage2.Controls.Add(label9);
            tabPage2.Controls.Add(txtTimeDelayedSimulation);
            tabPage2.Controls.Add(dateStartDelayed);
            tabPage2.Controls.Add(label8);
            tabPage2.Controls.Add(btnDelayedSimulation);
            tabPage2.Controls.Add(label6);
            tabPage2.Controls.Add(tempMinDelayed);
            tabPage2.Controls.Add(label5);
            tabPage2.Controls.Add(label7);
            tabPage2.Controls.Add(tempMaxDelayed);
            tabPage2.Location = new Point(4, 29);
            tabPage2.Name = "tabPage2";
            tabPage2.Padding = new Padding(3);
            tabPage2.Size = new Size(648, 517);
            tabPage2.TabIndex = 1;
            tabPage2.Text = "Symulacja cykliczna - z opóźnieniem";
            tabPage2.UseVisualStyleBackColor = true;
            // 
            // label18
            // 
            label18.AutoSize = true;
            label18.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label18.Location = new Point(124, 310);
            label18.Name = "label18";
            label18.Size = new Size(441, 29);
            label18.TabIndex = 24;
            label18.Text = "Maks Prędkość poruszania się(km/h)";
            // 
            // speedDelay
            // 
            speedDelay.Font = new Font("Segoe UI", 12F);
            speedDelay.Location = new Point(124, 342);
            speedDelay.Name = "speedDelay";
            speedDelay.Size = new Size(396, 34);
            speedDelay.TabIndex = 23;
            speedDelay.Text = "7";
            speedDelay.TextChanged += time_TextChanged;
            speedDelay.KeyPress += time_KeyPress;
            // 
            // txtTimeDelayedSimulation
            // 
            txtTimeDelayedSimulation.Font = new Font("Segoe UI", 12F);
            txtTimeDelayedSimulation.Location = new Point(124, 274);
            txtTimeDelayedSimulation.Name = "txtTimeDelayedSimulation";
            txtTimeDelayedSimulation.Size = new Size(396, 34);
            txtTimeDelayedSimulation.TabIndex = 20;
            txtTimeDelayedSimulation.Text = "5";
            txtTimeDelayedSimulation.TextChanged += time_TextChanged;
            txtTimeDelayedSimulation.KeyPress += time_KeyPress;
            // 
            // label8
            // 
            label8.AutoSize = true;
            label8.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label8.Location = new Point(124, 242);
            label8.Name = "label8";
            label8.Size = new Size(470, 29);
            label8.TabIndex = 21;
            label8.Text = "Czas pomiędzy odczytami w sekundach";
            // 
            // btnDelayedSimulation
            // 
            btnDelayedSimulation.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 238);
            btnDelayedSimulation.Location = new Point(124, 399);
            btnDelayedSimulation.Name = "btnDelayedSimulation";
            btnDelayedSimulation.Size = new Size(396, 49);
            btnDelayedSimulation.TabIndex = 19;
            btnDelayedSimulation.Text = "Rozpocznij symulację";
            btnDelayedSimulation.UseVisualStyleBackColor = true;
            btnDelayedSimulation.Click += btnDelayedSimulation_Click;
            // 
            // tabPage3
            // 
            tabPage3.Controls.Add(label19);
            tabPage3.Controls.Add(speedNow);
            tabPage3.Controls.Add(loopCountNow);
            tabPage3.Controls.Add(label17);
            tabPage3.Controls.Add(label12);
            tabPage3.Controls.Add(timeNow);
            tabPage3.Controls.Add(dateNow);
            tabPage3.Controls.Add(label13);
            tabPage3.Controls.Add(btnSimualtionNow);
            tabPage3.Controls.Add(label14);
            tabPage3.Controls.Add(tempMinNow);
            tabPage3.Controls.Add(label15);
            tabPage3.Controls.Add(label16);
            tabPage3.Controls.Add(tempMaxNow);
            tabPage3.Location = new Point(4, 29);
            tabPage3.Name = "tabPage3";
            tabPage3.Padding = new Padding(3);
            tabPage3.Size = new Size(648, 517);
            tabPage3.TabIndex = 2;
            tabPage3.Text = "Symulacja cykliczna - natychmiastowa";
            tabPage3.UseVisualStyleBackColor = true;
            // 
            // label19
            // 
            label19.AutoSize = true;
            label19.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label19.Location = new Point(124, 310);
            label19.Name = "label19";
            label19.Size = new Size(441, 29);
            label19.TabIndex = 35;
            label19.Text = "Maks Prędkość poruszania się(km/h)";
            // 
            // speedNow
            // 
            speedNow.Font = new Font("Segoe UI", 12F);
            speedNow.Location = new Point(124, 342);
            speedNow.Name = "speedNow";
            speedNow.Size = new Size(396, 34);
            speedNow.TabIndex = 34;
            speedNow.Text = "20";
            speedNow.TextChanged += lat_TextChanged;
            speedNow.KeyPress += lat_KeyPress;
            // 
            // loopCountNow
            // 
            loopCountNow.Font = new Font("Segoe UI", 12F);
            loopCountNow.Location = new Point(124, 411);
            loopCountNow.Name = "loopCountNow";
            loopCountNow.Size = new Size(396, 34);
            loopCountNow.TabIndex = 32;
            loopCountNow.TextChanged += time_TextChanged;
            loopCountNow.KeyPress += time_KeyPress;
            // 
            // label17
            // 
            label17.AutoSize = true;
            label17.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label17.Location = new Point(124, 379);
            label17.Name = "label17";
            label17.Size = new Size(392, 29);
            label17.TabIndex = 33;
            label17.Text = "Liczba generowanych odczytów?";
            // 
            // label12
            // 
            label12.AutoSize = true;
            label12.Font = new Font("Segoe UI", 13.8F, FontStyle.Bold, GraphicsUnit.Point, 238);
            label12.Location = new Point(124, 154);
            label12.Name = "label12";
            label12.Size = new Size(241, 31);
            label12.TabIndex = 28;
            label12.Text = "Data startu symulacji";
            // 
            // timeNow
            // 
            timeNow.Font = new Font("Segoe UI", 12F);
            timeNow.Location = new Point(124, 271);
            timeNow.Name = "timeNow";
            timeNow.Size = new Size(396, 34);
            timeNow.TabIndex = 30;
            timeNow.Text = "10";
            timeNow.TextChanged += time_TextChanged;
            timeNow.KeyPress += time_KeyPress;
            // 
            // dateNow
            // 
            dateNow.CustomFormat = "dd.MM.yyyy hh:mm:ss";
            dateNow.Font = new Font("Segoe UI", 12F);
            dateNow.Format = DateTimePickerFormat.Custom;
            dateNow.Location = new Point(124, 188);
            dateNow.Name = "dateNow";
            dateNow.Size = new Size(396, 34);
            dateNow.TabIndex = 27;
            // 
            // label13
            // 
            label13.AutoSize = true;
            label13.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label13.Location = new Point(124, 239);
            label13.Name = "label13";
            label13.Size = new Size(470, 29);
            label13.TabIndex = 31;
            label13.Text = "Czas pomiędzy odczytami w sekundach";
            // 
            // btnSimualtionNow
            // 
            btnSimualtionNow.Font = new Font("Segoe UI", 13.8F, FontStyle.Regular, GraphicsUnit.Point, 238);
            btnSimualtionNow.Location = new Point(124, 462);
            btnSimualtionNow.Name = "btnSimualtionNow";
            btnSimualtionNow.Size = new Size(396, 49);
            btnSimualtionNow.TabIndex = 29;
            btnSimualtionNow.Text = "Przeslij gotową symulację";
            btnSimualtionNow.UseVisualStyleBackColor = true;
            btnSimualtionNow.Click += btnSimualtionNow_Click;
            // 
            // label14
            // 
            label14.AutoSize = true;
            label14.Font = new Font("Microsoft Sans Serif", 13.8F, FontStyle.Bold);
            label14.Location = new Point(124, 35);
            label14.Name = "label14";
            label14.Size = new Size(431, 29);
            label14.TabIndex = 24;
            label14.Text = "Temperatury - przedział w symulacji";
            // 
            // tempMinNow
            // 
            tempMinNow.Font = new Font("Segoe UI", 12F);
            tempMinNow.Location = new Point(124, 104);
            tempMinNow.Name = "tempMinNow";
            tempMinNow.Size = new Size(186, 34);
            tempMinNow.TabIndex = 22;
            tempMinNow.Text = "30";
            tempMinNow.TextChanged += temp_TextChanged;
            tempMinNow.KeyPress += temp_KeyPress;
            // 
            // label15
            // 
            label15.AutoSize = true;
            label15.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label15.Location = new Point(124, 73);
            label15.Name = "label15";
            label15.Size = new Size(102, 28);
            label15.TabIndex = 23;
            label15.Text = "Temp MIN";
            // 
            // label16
            // 
            label16.AutoSize = true;
            label16.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label16.Location = new Point(334, 73);
            label16.Name = "label16";
            label16.Size = new Size(107, 28);
            label16.TabIndex = 26;
            label16.Text = "Temp MAX";
            // 
            // tempMaxNow
            // 
            tempMaxNow.Font = new Font("Segoe UI", 12F);
            tempMaxNow.Location = new Point(334, 104);
            tempMaxNow.Name = "tempMaxNow";
            tempMaxNow.Size = new Size(186, 34);
            tempMaxNow.TabIndex = 25;
            tempMaxNow.Text = "40";
            tempMaxNow.TextChanged += temp_TextChanged;
            tempMaxNow.KeyPress += temp_KeyPress;
            // 
            // lblSimulationCount
            // 
            lblSimulationCount.AutoSize = true;
            lblSimulationCount.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            lblSimulationCount.Location = new Point(189, 823);
            lblSimulationCount.Name = "lblSimulationCount";
            lblSimulationCount.Size = new Size(36, 28);
            lblSimulationCount.TabIndex = 22;
            lblSimulationCount.Text = "---";
            // 
            // label20
            // 
            label20.AutoSize = true;
            label20.Font = new Font("Segoe UI", 16.2F, FontStyle.Bold, GraphicsUnit.Point, 238);
            label20.Location = new Point(191, -2);
            label20.Name = "label20";
            label20.Size = new Size(110, 38);
            label20.TabIndex = 17;
            label20.Text = "Url API";
            // 
            // txtUrl
            // 
            txtUrl.Font = new Font("Segoe UI", 12F);
            txtUrl.Location = new Point(191, 39);
            txtUrl.Name = "txtUrl";
            txtUrl.Size = new Size(392, 34);
            txtUrl.TabIndex = 18;
            txtUrl.Text = "http://localhost:8080/api/";
            // 
            // label21
            // 
            label21.AutoSize = true;
            label21.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label21.Location = new Point(397, 76);
            label21.Name = "label21";
            label21.Size = new Size(94, 28);
            label21.TabIndex = 22;
            label21.Text = "Id tracker";
            // 
            // txtTrackerId
            // 
            txtTrackerId.Font = new Font("Segoe UI", 12F);
            txtTrackerId.Location = new Point(397, 107);
            txtTrackerId.Name = "txtTrackerId";
            txtTrackerId.Size = new Size(186, 34);
            txtTrackerId.TabIndex = 21;
            txtTrackerId.Text = "1";
            txtTrackerId.KeyPress += time_KeyPress;
            // 
            // label22
            // 
            label22.AutoSize = true;
            label22.Font = new Font("Segoe UI", 12F, FontStyle.Regular, GraphicsUnit.Point, 238);
            label22.Location = new Point(189, 76);
            label22.Name = "label22";
            label22.Size = new Size(100, 28);
            label22.TabIndex = 20;
            label22.Text = "Id Zwierze";
            // 
            // txtAnimalId
            // 
            txtAnimalId.Font = new Font("Segoe UI", 12F);
            txtAnimalId.Location = new Point(189, 107);
            txtAnimalId.Name = "txtAnimalId";
            txtAnimalId.Size = new Size(186, 34);
            txtAnimalId.TabIndex = 19;
            txtAnimalId.Text = "1";
            txtAnimalId.KeyPress += time_KeyPress;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(797, 983);
            Controls.Add(label21);
            Controls.Add(txtTrackerId);
            Controls.Add(lblSimulationCount);
            Controls.Add(label22);
            Controls.Add(txtAnimalId);
            Controls.Add(txtUrl);
            Controls.Add(label20);
            Controls.Add(tabControl1);
            Controls.Add(label4);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(lon);
            Controls.Add(label1);
            Controls.Add(lat);
            Name = "Form1";
            Text = "Form1";
            tabControl1.ResumeLayout(false);
            tabPage1.ResumeLayout(false);
            tabPage1.PerformLayout();
            tabPage2.ResumeLayout(false);
            tabPage2.PerformLayout();
            tabPage3.ResumeLayout(false);
            tabPage3.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox lat;
        private Label label1;
        private Label label2;
        private TextBox lon;
        private Label label3;
        private Label label4;
        private Label label5;
        private TextBox tempMinDelayed;
        private Label label6;
        private Label label7;
        private TextBox tempMaxDelayed;
        private DateTimePicker dateStartDelayed;
        private Label label9;
        private TabControl tabControl1;
        private TabPage tabPage1;
        private TabPage tabPage2;
        private Label label11;
        private DateTimePicker dateOnePoint;
        private Button btnOnePoint;
        private Label label10;
        private TextBox tempOnePoint;
        private TextBox txtTimeDelayedSimulation;
        private Label label8;
        private Button btnDelayedSimulation;
        private Label lblSimulationCount;
        private TabPage tabPage3;
        private TextBox loopCountNow;
        private Label label17;
        private Label label12;
        private TextBox timeNow;
        private DateTimePicker dateNow;
        private Label label13;
        private Button btnSimualtionNow;
        private Label label14;
        private TextBox tempMinNow;
        private Label label15;
        private Label label16;
        private TextBox tempMaxNow;
        private Label label18;
        private TextBox speedDelay;
        private Label label19;
        private TextBox speedNow;
        private Label label20;
        private TextBox txtUrl;
        private Label label21;
        private TextBox txtTrackerId;
        private Label label22;
        private TextBox txtAnimalId;
    }
}
